import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
}

interface Notification {
    id: number;
    message: string;
    type: 'info' | 'success' | 'error';
}

interface AdminState {
    // Auth
    user: User | null;
    isLoggedIn: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;

    // Data
    packages: any[];
    services: any[];
    orders: any[];
    customers: any[];
    errors: any[];
    settings: any | null;

    setPackages: (packages: any[]) => void;
    setServices: (services: any[]) => void;
    setOrders: (orders: any[]) => void;
    setCustomers: (customers: any[]) => void;
    setErrors: (errors: any[]) => void;
    setSettings: (settings: any) => void;

    // Theme
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;

    // Notifications
    notifications: Notification[];
    addNotification: (message: string, type?: 'info' | 'success' | 'error') => void;
    removeNotification: (id: number) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
    // Auth
    user: null,
    isLoggedIn: false,
    setUser: (user) => set({ user, isLoggedIn: !!user }),
    logout: () => {
        set({ user: null, isLoggedIn: false });
    },

    // Data
    packages: [],
    services: [],
    orders: [],
    customers: [],
    errors: [],
    settings: null,

    setPackages: (packages) => set({ packages }),
    setServices: (services) => set({ services }),
    setOrders: (orders) => set({ orders }),
    setCustomers: (customers) => set({ customers }),
    setErrors: (errors) => set({ errors }),
    setSettings: (settings) => set({ settings }),

    // Theme
    theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'dark',
    setTheme: (theme) => {
        localStorage.setItem('theme', theme);
        set({ theme });
    },

    // Notifications
    notifications: [],
    addNotification: (message, type = 'info') => set((state) => ({
        notifications: [...state.notifications, {
            id: Date.now(),
            message,
            type
        }]
    })),
    removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
    })),
}));
