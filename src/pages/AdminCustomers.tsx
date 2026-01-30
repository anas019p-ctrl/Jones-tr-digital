import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

export default function AdminCustomers() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscribers = async () => {
            const { data, error } = await supabase
                .from('newsletter_subscribers')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setSubscribers(data);
            }
            setLoading(false);
        };
        fetchSubscribers();
    }, []);

    return (
        <AdminLayout title="Lead Newsletter">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
                    <div>
                        <h2 className="text-lg font-medium text-foreground">Database Iscritti</h2>
                        <p className="text-muted-foreground">Persone interessate ai tuoi aggiornamenti AI.</p>
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-muted-foreground">Caricamento...</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {subscribers.map((sub) => (
                            <Card key={sub.id} className="p-4 glass-card flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarFallback className="bg-cyber-cyan/20 text-cyber-cyan">
                                            {sub.email.substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold text-foreground">{sub.email}</h3>
                                        <p className="text-xs text-muted-foreground">
                                            Iscritto il: {new Date(sub.created_at).toLocaleDateString('it-IT')}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <span className="px-2 py-1 rounded-full bg-cyber-cyan/10 text-cyber-cyan text-[10px] font-bold uppercase tracking-wider">
                                        Active Lead
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
