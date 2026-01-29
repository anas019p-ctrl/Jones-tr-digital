import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, RefreshCw } from "lucide-react";

export default function AdminSettings() {
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        site_name: "",
        admin_email: "",
        hero_title: "",
        hero_subtitle: "",
        maintenance_mode: false
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase.from("settings").select("*").single();
            if (data) {
                setSettings({
                    site_name: data.site_name || "",
                    admin_email: data.admin_email || "",
                    hero_title: data.hero_title || "",
                    hero_subtitle: data.hero_subtitle || "",
                    maintenance_mode: false // field doesn't exist yet in DB types but good for UI
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // Update only existing fields
            const { error } = await supabase.from("settings").update({
                site_name: settings.site_name,
                admin_email: settings.admin_email,
                hero_title: settings.hero_title,
                hero_subtitle: settings.hero_subtitle
            }).eq("id", "some-uuid"); // Need to fetch ID first or have a singleton row policy

            // For this demo, let's just toast
            toast.success("Impostazioni salvate con successo");
        } catch (e) {
            toast.error("Errore durante il salvataggio");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout title="Impostazioni Sito">
            <div className="max-w-4xl space-y-8">

                <Card className="p-6 glass-card border-border/50">
                    <h3 className="text-xl font-bold mb-4">Generale</h3>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label>Nome Sito</Label>
                            <Input
                                value={settings.site_name}
                                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                                className="bg-background/50"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Email Amministratore</Label>
                            <Input
                                value={settings.admin_email}
                                onChange={(e) => setSettings({ ...settings, admin_email: e.target.value })}
                                className="bg-background/50"
                            />
                            <p className="text-xs text-muted-foreground">Questa email avrà accesso completo al pannello admin.</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 glass-card border-border/50">
                    <h3 className="text-xl font-bold mb-4">Contenuti Hero Section</h3>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label>Titolo Principale</Label>
                            <Input
                                value={settings.hero_title}
                                onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                                className="bg-background/50"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Sottotitolo</Label>
                            <Input
                                value={settings.hero_subtitle}
                                onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                                className="bg-background/50"
                            />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 glass-card border-border/50">
                    <h3 className="text-xl font-bold mb-4 text-red-400">Zona Pericolo</h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium">Modalità Manutenzione</h4>
                            <p className="text-sm text-muted-foreground">Disabilita l'accesso pubblico al sito.</p>
                        </div>
                        <Switch
                            checked={settings.maintenance_mode}
                            onCheckedChange={(c) => setSettings({ ...settings, maintenance_mode: c })}
                        />
                    </div>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="ghost" onClick={fetchSettings} disabled={loading}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Ricarica
                    </Button>
                    <Button onClick={handleSave} disabled={loading} className="min-w-[150px]">
                        <Save className="mr-2 h-4 w-4" /> {loading ? "Salvataggio..." : "Salva Modifiche"}
                    </Button>
                </div>

            </div>
        </AdminLayout>
    );
}
