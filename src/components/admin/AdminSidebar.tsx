import { Link, useLocation } from 'react-router-dom';
import { useAdminStore } from '@/store/adminStore';
import {
    LayoutDashboard,
    Mail,
    Package,
    DollarSign,
    Wrench,
    BookOpen,
    ShoppingCart,
    Users,
    AlertCircle,
    Settings,
    LogOut,
    ChevronRight,
    ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Logo3D from '@/components/Logo3D';

interface AdminSidebarProps {
    isOpen: boolean;
    onLogout: () => void;
}

export default function AdminSidebar({ isOpen, onLogout }: AdminSidebarProps) {
    const location = useLocation();
    const theme = useAdminStore((state) => state.theme);

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Mail, label: 'Richieste', path: '/admin/contacts' },
        { icon: Package, label: 'Pacchetti', path: '/admin/packages' },
        { icon: DollarSign, label: 'Prezzi', path: '/admin/prices' },
        { icon: Wrench, label: 'Servizi', path: '/admin/services' },
        { icon: BookOpen, label: 'Blog/Note', path: '/admin/blog' },
        { icon: ShoppingCart, label: 'Ordini', path: '/admin/orders' },
        { icon: Users, label: 'Clienti', path: '/admin/customers' },
        { icon: AlertCircle, label: 'Errori & Log', path: '/admin/errors' },
        { icon: Settings, label: 'Impostazioni', path: '/admin/settings' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className={cn(
            "h-screen border-r transition-all duration-300 flex flex-col z-50 sticky top-0",
            isOpen ? "w-64" : "w-20",
            "bg-card/50 backdrop-blur-xl border-border/50"
        )}>

            {/* Brand */}
            <div className="p-6 border-b border-border/50 flex flex-col gap-4">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 shrink-0">
                        <Logo3D />
                    </div>
                    {isOpen && (
                        <div className="overflow-hidden whitespace-nowrap">
                            <h2 className="font-display font-bold text-lg gradient-text">JONES TR</h2>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Admin Control</p>
                        </div>
                    )}
                </Link>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1 py-6 custom-scrollbar">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                                active
                                    ? "bg-primary/20 text-primary"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                            )}
                        >
                            <Icon size={20} className={cn(
                                "flex-shrink-0 transition-colors",
                                active ? "text-primary" : "group-hover:text-primary"
                            )} />
                            {isOpen && (
                                <span className="flex-1 font-medium text-sm">{item.label}</span>
                            )}
                            {isOpen && active && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary"
                                />
                            )}

                            {!isOpen && active && (
                                <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-full" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-border/50 space-y-2">
                <Button
                    variant="ghost"
                    onClick={onLogout}
                    className={cn(
                        "w-full justify-start gap-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10",
                        !isOpen && "justify-center px-0"
                    )}
                >
                    <LogOut size={20} />
                    {isOpen && <span>Logout</span>}
                </Button>
            </div>
        </aside>
    );
}

// Simple motion polyfill if needed, but project has framer-motion
import { motion } from 'framer-motion';
