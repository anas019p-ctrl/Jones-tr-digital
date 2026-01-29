import { useAdminStore } from '@/store/adminStore';
import { Menu, Moon, Sun, Bell, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ThemeToggle from '@/components/ThemeToggle';

interface AdminHeaderProps {
    onMenuClick: () => void;
    title: string;
}

export default function AdminHeader({ onMenuClick, title }: AdminHeaderProps) {
    const theme = useAdminStore((state) => state.theme);
    const user = useAdminStore((state) => state.user);

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md border-border/50">
            <div className="flex h-16 items-center justify-between px-6">

                {/* Left */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-display font-bold text-foreground">
                        {title}
                    </h1>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">

                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </Button>

                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                                <Avatar className="h-10 w-10 border border-border/50">
                                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                        {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || 'A'}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 glass-card border-border/50" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-bold leading-none">{user?.name || 'Amministratore'}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="focus:bg-primary/10 cursor-pointer">
                                <SettingsIcon className="mr-2 h-4 w-4" />
                                <span>Impostazioni</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-primary/10 cursor-pointer">
                                Profilo
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
