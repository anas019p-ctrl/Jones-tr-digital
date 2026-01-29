import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Save, X, DollarSign, Package, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ServiceTier {
    id: string;
    name: string;
    price: string;
    features: string[];
    highlighted: boolean;
    order_index: number;
}

const ServicesManager = () => {
    const [services, setServices] = useState<ServiceTier[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data, error } = await supabase
                .from("services")
                .select("*")
                .order("order_index", { ascending: true });

            if (error) throw error;
            setServices(data || []);
        } catch (error) {
            console.error("Error fetching services:", error);
            toast.error("Failed to load services");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (service: ServiceTier) => {
        try {
            const { error } = await supabase
                .from("services")
                .update({
                    name: service.name,
                    price: service.price,
                    features: service.features,
                    highlighted: service.highlighted,
                })
                .eq("id", service.id);

            if (error) throw error;
            toast.success("Service updated successfully!");
            setEditingId(null);
        } catch (error) {
            console.error("Error updating service:", error);
            toast.error("Failed to update service");
        }
    };

    const updateServiceLocal = (id: string, field: keyof ServiceTier, value: any) => {
        setServices(
            services.map((s) => (s.id === id ? { ...s, [field]: value } : s))
        );
    };

    const addFeature = (serviceId: string) => {
        setServices(
            services.map((s) =>
                s.id === serviceId ? { ...s, features: [...(s.features || []), ""] } : s
            )
        );
    };

    const updateFeature = (serviceId: string, featureIndex: number, value: string) => {
        setServices(
            services.map((s) =>
                s.id === serviceId
                    ? {
                        ...s,
                        features: s.features.map((f, i) => (i === featureIndex ? value : f)),
                    }
                    : s
            )
        );
    };

    const removeFeature = (serviceId: string, featureIndex: number) => {
        setServices(
            services.map((s) =>
                s.id === serviceId
                    ? { ...s, features: s.features.filter((_, i) => i !== featureIndex) }
                    : s
            )
        );
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Service Tiers</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <Card
                        key={service.id}
                        className={`p-6 glass-card ${service.highlighted ? "border-primary/50 shadow-glow" : ""
                            }`}
                    >
                        <div className="space-y-4">
                            {/* Service Name */}
                            <div className="flex items-center justify-between">
                                <Input
                                    value={service.name}
                                    onChange={(e) => updateServiceLocal(service.id, "name", e.target.value)}
                                    className="font-bold text-lg"
                                    disabled={editingId !== service.id}
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        if (editingId === service.id) {
                                            handleSave(service);
                                        } else {
                                            setEditingId(service.id);
                                        }
                                    }}
                                >
                                    {editingId === service.id ? <Save className="w-4 h-4" /> : "Edit"}
                                </Button>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-primary" />
                                <Input
                                    value={service.price}
                                    onChange={(e) => updateServiceLocal(service.id, "price", e.target.value)}
                                    className="text-2xl font-bold"
                                    disabled={editingId !== service.id}
                                />
                            </div>

                            {/* Highlighted Badge */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={service.highlighted}
                                    onChange={(e) =>
                                        updateServiceLocal(service.id, "highlighted", e.target.checked)
                                    }
                                    disabled={editingId !== service.id}
                                    className="w-4 h-4 accent-primary"
                                />
                                <span className="text-sm text-muted-foreground">Highlighted</span>
                            </div>

                            {/* Features */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                                        <Package className="w-4 h-4" />
                                        Features
                                    </span>
                                    {editingId === service.id && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => addFeature(service.id)}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    {service.features?.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            {editingId === service.id ? (
                                                <>
                                                    <Input
                                                        value={feature}
                                                        onChange={(e) =>
                                                            updateFeature(service.id, idx, e.target.value)
                                                        }
                                                        className="text-sm"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeFeature(service.id, idx)}
                                                    >
                                                        <X className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </>
                                            ) : (
                                                <Badge variant="secondary" className="text-xs break-all">
                                                    {feature}
                                                </Badge>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ServicesManager;
