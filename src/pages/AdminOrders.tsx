import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, XCircle } from "lucide-react";

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Using contact_requests as 'orders' for now since that's where leads come in
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from("contact_requests")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Errore caricamento ordini");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout title="Gestione Ordini">
            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-medium text-foreground">Ordini e Richieste</h2>
                    <p className="text-muted-foreground">Monitora e gestisci le richieste in arrivo dai clienti.</p>
                </div>

                <Card className="glass-card border-border/50 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-border/50">
                                <TableHead>Cliente</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Interesse</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Stato</TableHead>
                                <TableHead className="text-right">Azioni</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                        Nessun ordine trovato.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                orders.map((order) => (
                                    <TableRow key={order.id} className="hover:bg-primary/5 border-border/50">
                                        <TableCell className="font-medium">{order.name}</TableCell>
                                        <TableCell>{order.email}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                                {order.service_interest || "Generale"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={order.read ? "secondary" : "default"}>
                                                {order.read ? "Letto" : "Nuovo"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" title="Vedi Dettagli">
                                                    <Eye size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-400 hover:bg-green-500/10" title="Accetta">
                                                    <CheckCircle size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AdminLayout>
    );
}
