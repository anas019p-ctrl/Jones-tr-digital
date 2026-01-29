import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

export default function AdminErrors() {
    const logs = [
        { id: 1, type: "error", message: "Failed to connect to database", time: "10:23 AM", date: "Today" },
        { id: 2, type: "warning", message: "High latency detected", time: "09:12 AM", date: "Today" },
        { id: 3, type: "info", message: "User admin logged in", time: "09:00 AM", date: "Today" },
        { id: 4, type: "success", message: "Backup completed successfully", time: "02:00 AM", date: "Today" },
    ];

    return (
        <AdminLayout title="Log di Sistema">
            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-medium text-foreground">Monitoraggio Errori</h2>
                    <p className="text-muted-foreground">Log degli eventi di sistema ed errori recenti.</p>
                </div>

                <Card className="glass-card border-border/50 p-0 overflow-hidden text-sm">
                    <div className="p-4 bg-muted/20 border-b border-border/50 font-medium grid grid-cols-12 gap-4">
                        <div className="col-span-2">Orario</div>
                        <div className="col-span-2">Livello</div>
                        <div className="col-span-8">Messaggio</div>
                    </div>
                    <div className="divide-y divide-border/50">
                        {logs.map((log) => (
                            <div key={log.id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-white/5 transition-colors">
                                <div className="col-span-2 text-muted-foreground">
                                    {log.date}, {log.time}
                                </div>
                                <div className="col-span-2">
                                    {log.type === "error" && <Badge variant="destructive" className="gap-1"><AlertCircle size={10} /> Error</Badge>}
                                    {log.type === "warning" && <Badge variant="secondary" className="gap-1 bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"><AlertCircle size={10} /> Warning</Badge>}
                                    {log.type === "info" && <Badge variant="outline" className="gap-1"><Info size={10} /> Info</Badge>}
                                    {log.type === "success" && <Badge variant="default" className="gap-1 bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/20"><CheckCircle size={10} /> Success</Badge>}
                                </div>
                                <div className="col-span-8 font-mono text-xs md:text-sm text-foreground">
                                    {log.message}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AdminLayout>
    );
}
