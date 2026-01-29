import { useEffect, useState } from 'react';
import { useAdminStore } from '@/store/adminStore';
import AdminLayout from '@/components/admin/AdminLayout';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

export default function AdminDashboard() {
    const theme = useAdminStore((state) => state.theme);
    // Mock data for now, replaced with real data later
    const [stats, setStats] = useState({
        totalRevenue: 24500,
        totalOrders: 42,
        totalCustomers: 156,
        conversionRate: 3.2
    });

    const [recentOrders, setRecentOrders] = useState<any[]>([]);

    // Dati per chart (ultimi 7 giorni)
    const chartData = [
        { day: 'Lun', revenue: 1200, orders: 4 },
        { day: 'Mar', revenue: 1900, orders: 6 },
        { day: 'Mer', revenue: 1500, orders: 5 },
        { day: 'Gio', revenue: 2200, orders: 7 },
        { day: 'Ven', revenue: 2800, orders: 9 },
        { day: 'Sab', revenue: 2290, orders: 8 },
        { day: 'Dom', revenue: 2000, orders: 6 },
    ];

    useEffect(() => {
        // Fetch real data logic here in the future
        const fetchDashboardData = async () => {
            // Placeholder for real DB calls
            // const { data: orders } = await supabase.from('orders').select('*');
        };
        fetchDashboardData();
    }, []);

    return (
        <AdminLayout title="Bacheca">
            <div className="space-y-8">

                {/* Welcome Section */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-display font-bold text-foreground">
                        Bentornato, Amministratore 👋
                    </h2>
                    <p className="text-muted-foreground">
                        Ecco una panoramica completa delle prestazioni del tuo sito e del tuo business.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={DollarSign}
                        label="Fatturato Totale"
                        value={`€${stats.totalRevenue.toLocaleString()}`}
                        change="+12.5%"
                        trend="up"
                    />
                    <StatCard
                        icon={ShoppingCart}
                        label="Ordini Totali"
                        value={stats.totalOrders}
                        change="+8 questa settimana"
                        trend="up"
                    />
                    <StatCard
                        icon={Users}
                        label="Clienti Totali"
                        value={stats.totalCustomers}
                        change="+5 nuovi"
                        trend="up"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Tasso di Conversione"
                        value={`${stats.conversionRate}%`}
                        change="+0.4%"
                        trend="up"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Revenue Chart */}
                    <Card className="p-6 glass-card border-border/50">
                        <h3 className="text-lg font-bold mb-6 text-foreground">Andamento Fatturato</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value}`} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: 'hsl(var(--card))', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={3}
                                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Orders Chart */}
                    <Card className="p-6 glass-card border-border/50">
                        <h3 className="text-lg font-bold mb-6 text-foreground">Ordini Settimanali</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: 'hsl(var(--card))', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                    <Bar dataKey="orders" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}

function StatCard({ icon: Icon, label, value, change, trend }: any) {
    return (
        <Card className="p-6 glass-card border-border/50 hover-lift">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    <h4 className="text-2xl font-bold text-foreground mt-1">{value}</h4>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Icon size={20} />
                </div>
            </div>
            <div className="flex items-center gap-1 text-sm">
                <span className={cn(
                    "font-medium",
                    trend === 'up' ? "text-green-500" : "text-red-500"
                )}>
                    {change}
                </span>
                <span className="text-muted-foreground">vs mese scorso</span>
            </div>
        </Card>
    );
}
