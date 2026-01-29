import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AdminCustomers() {
    const [customers, setCustomers] = useState([
        { id: 1, name: "Mario Rossi", email: "mario@example.com", spent: "1200", projects: 2, status: "Active" },
        { id: 2, name: "Giulia Bianchi", email: "giulia@company.com", spent: "3500", projects: 1, status: "Active" },
        { id: 3, name: "Tech Startup SRL", email: "info@techstart.it", spent: "8900", projects: 4, status: "VIP" },
    ]);

    return (
        <AdminLayout title="Gestione Clienti">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
                    <div>
                        <h2 className="text-lg font-medium text-foreground">Database Clienti</h2>
                        <p className="text-muted-foreground">Visualizza e gestisci le anagrafiche dei tuoi clienti.</p>
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input placeholder="Cerca cliente..." className="pl-10 bg-card/50" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {customers.map((customer) => (
                        <Card key={customer.id} className="p-4 glass-card hover:bg-card/80 transition-colors flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarFallback className="bg-primary/20 text-primary">
                                        {customer.name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-foreground">{customer.name}</h3>
                                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center gap-8 text-sm">
                                <div className="text-center">
                                    <p className="text-muted-foreground">Spesa Totale</p>
                                    <p className="font-bold text-foreground">€{customer.spent}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-muted-foreground">Progetti</p>
                                    <p className="font-bold text-foreground">{customer.projects}</p>
                                </div>
                                <div className="text-center">
                                    <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold">
                                        {customer.status}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
