import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function AdminBlog() {
    return (
        <AdminLayout title="Blog & Note">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-medium text-foreground">Gestione Contenuti</h2>
                        <p className="text-muted-foreground">Scrivi articoli, note o aggiornamenti per il sito.</p>
                    </div>
                    <Button className="gap-2">
                        <Plus size={16} /> Nuovo Articolo
                    </Button>
                </div>

                <div className="grid gap-6">
                    <Card className="p-10 border-dashed border-2 bg-transparent flex flex-col items-center justify-center text-center text-muted-foreground min-h-[300px]">
                        <p className="mb-4">Nessun articolo presente ancora.</p>
                        <Button variant="outline">Inizia a scrivere</Button>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
