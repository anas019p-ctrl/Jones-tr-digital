import { useState, useEffect } from 'react';
import { useAdminStore } from '@/store/adminStore';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title = "Bacheca" }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isVerifying, setIsVerifying] = useState(true);
    const { setUser, logout, theme } = useAdminStore();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                navigate("/login");
                return;
            }

            // Authorization Check
            const { data: settings } = await supabase
                .from("settings")
                .select("admin_email")
                .single();

            const userEmail = session.user.email?.toLowerCase();
            const primaryAdmin = settings?.admin_email?.toLowerCase();
            const allowedAdmins = [primaryAdmin, "gibrilgabri8@gmail.com", "anas019p@gmail.com"];

            if (!allowedAdmins.includes(userEmail)) {
                toast.error("Accesso non autorizzato");
                await supabase.auth.signOut();
                navigate("/login");
                return;
            }

            setUser({
                id: session.user.id,
                email: session.user.email || "",
                name: "Amministratore",
                role: "Super Admin"
            });
            setIsVerifying(false);
        };

        checkAuth();
    }, [navigate, setUser]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        logout();
        toast.success("Logout effettuato");
        navigate("/login");
    };

    if (isVerifying) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <p className="text-muted-foreground animate-pulse font-display">Verificando autorizzazioni...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground">

            {/* Sidebar - Desktop */}
            <AdminSidebar isOpen={sidebarOpen} onLogout={handleLogout} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative overflow-hidden">

                {/* Header */}
                <AdminHeader
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                    title={title}
                />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
