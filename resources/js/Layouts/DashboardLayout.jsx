// resources/js/Layouts/DashboardLayout.jsx
"use client";

import { useState, useEffect } from "react";
import {
    BarChart,
    Users,
    Home,
    Settings,
    Bell,
    Search,
    Menu,
    X,
    ChevronDown,
    LogOut,
    AppWindowIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { usePage, Link } from "@inertiajs/react";
import { UserDropdown } from "@/components/UserDropdown";
import { FlashMessage } from "@/components/FlashMessage";

export default function DashboardLayout({ children }) {
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage().props;
    const { url } = usePage();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navItems = [
        { name: "Dashboard", icon: BarChart, href: "/dashboard" },
        { name: "Applications", icon: AppWindowIcon, href: "/applications" },
        { name: "Users", icon: Users, href: "/users" },
        { name: "Settings", icon: Settings, href: "/settings" },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Flash Message */}
            <FlashMessage />
            
            {/* Mobile Sidebar Toggle */}
            {isMobile && (
                <Button
                    variant="outline"
                    size="icon"
                    className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 shadow-lg bg-white"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu className="h-6 w-6" />
                </Button>
            )}

            {/* Sidebar */}
            <div
                className={`${
                    isMobile
                        ? "fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out"
                        : "w-64"
                } ${
                    isMobile && !sidebarOpen
                        ? "-translate-x-full"
                        : "translate-x-0"
                } bg-white border-r border-gray-200 flex flex-col`}
            >
                {isMobile && (
                    <div className="flex justify-end p-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                )}
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-semibold text-blue-600">
                        Dashboard
                    </h1>
                </div>
                <div className="flex-1 py-6 overflow-y-auto">
                    <nav className="space-y-1 px-3">
                        {navItems.map((item) => {
                            const isActive = url.startsWith(item.href);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                                        isActive
                                            ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="p-4 border-t border-gray-200">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 flex items-center justify-between px-4 py-4 md:px-6">
                    <div className="flex items-center">
                        {isMobile && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="mr-2"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        )}
                        <div className="relative w-64 max-w-xs hidden md:block">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                        </Button>

                        {/* ✅ Use the new UserDropdown here */}
                        <UserDropdown
                            user={{
                                name: auth?.user?.name || "User",
                                email: auth?.user?.email || "user@example.com",
                                image: auth?.user?.image || null, // if available
                            }}
                            onProfileClick={() =>
                                (window.location.href = "/profile")
                            }
                            onSettingsClick={() =>
                                (window.location.href = "/settings")
                            }
                            onNotificationsClick={() =>
                                (window.location.href = "/notifications")
                            }
                            onBillingClick={() =>
                                (window.location.href = "/billing")
                            }
                            onHelpClick={() => alert("Help is coming soon!")}
                            onLogoutClick={() =>
                                (window.location.href = "/logout")
                            } // or use Inertia visit
                        />
                    </div>
                </header>

                {/* Main Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
