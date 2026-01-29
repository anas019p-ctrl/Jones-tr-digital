import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, Package } from "lucide-react";
import { toast } from "sonner";

interface ContactRequest {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string | null;
    message: string;
    services_of_interest: string[];
    created_at: string;
}

const LeadsManager = () => {
    const [leads, setLeads] = useState<ContactRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const { data, error } = await supabase
                .from("contact_requests")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setLeads(data || []);
        } catch (error) {
            toast.error("Failed to load leads");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="text-muted-foreground">Loading leads...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Contact Requests</h2>
                <Badge variant="secondary">{leads.length} Total</Badge>
            </div>

            <div className="grid gap-4">
                {leads.map((lead) => (
                    <Card key={lead.id} className="p-6 glass-card hover-lift">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-semibold text-lg text-foreground">{lead.name}</h3>
                                    {lead.company && (
                                        <Badge variant="outline" className="text-xs">
                                            {lead.company}
                                        </Badge>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="w-4 h-4 text-primary" />
                                        <a href={`mailto:${lead.email}`} className="hover:text-primary transition-colors">
                                            {lead.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Phone className="w-4 h-4 text-primary" />
                                        <a href={`tel:${lead.phone}`} className="hover:text-primary transition-colors">
                                            {lead.phone}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        {new Date(lead.created_at).toLocaleDateString("it-IT", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </div>
                                </div>

                                {lead.services_of_interest && lead.services_of_interest.length > 0 && (
                                    <div className="flex items-start gap-2">
                                        <Package className="w-4 h-4 text-accent mt-0.5" />
                                        <div className="flex flex-wrap gap-2">
                                            {lead.services_of_interest.map((service, idx) => (
                                                <Badge key={idx} variant="secondary" className="text-xs">
                                                    {service}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {lead.message && (
                                    <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                                        <p className="text-sm text-muted-foreground italic">"{lead.message}"</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}

                {leads.length === 0 && (
                    <Card className="p-12 text-center">
                        <p className="text-muted-foreground">No contact requests yet.</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default LeadsManager;
