import React from "react";
import { Link, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CustomButton } from "@/components/ui/custom-button";
import { Button } from "@/components/ui/button";
import { Search, UserPlus2, Mail, Shield, Settings2, Edit, Trash2 } from "lucide-react";

const UsersIndex = () => {
    const { users } = usePage().props;

    // Format date helper function
    const formatDate = (dateString) => {
        if (!dateString) return '—';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('default', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Users</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage user accounts, settings, and permissions
                    </p>
                </div>
                <Link href={route('users.create')}>
                    <CustomButton className="flex items-center gap-2">
                        <UserPlus2 size={16} />
                        <span>Add New User</span>
                    </CustomButton>
                </Link>
            </div>

            {/* Main Content */}
            <Card>
                <CardHeader className="border-b bg-gray-50/50">
                    <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                        <div>
                            <CardTitle>All Users</CardTitle>
                            <CardDescription>A list of all users in your application</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input 
                                    placeholder="Search users..." 
                                    className="pl-10 min-w-[250px]"
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                        <TableCell>
                                            <Badge className={user.email_verified_at ? "bg-emerald-500" : "bg-yellow-500"}>
                                                {user.email_verified_at ? "Verified" : "Pending"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {formatDate(user.created_at)}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {formatDate(user.updated_at)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    title="Edit User"
                                                    onClick={() => {}}
                                                >
                                                    <Edit size={16} className="text-blue-600" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    title="Email Settings"
                                                    onClick={() => {}}
                                                >
                                                    <Mail size={16} className="text-gray-600" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    title="Security Settings"
                                                    onClick={() => {}}
                                                >
                                                    <Shield size={16} className="text-gray-600" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    title="Preferences"
                                                    onClick={() => {}}
                                                >
                                                    <Settings2 size={16} className="text-gray-600" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    title="Delete User"
                                                    onClick={() => {}}
                                                >
                                                    <Trash2 size={16} className="text-red-600" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {users.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

UsersIndex.layout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default UsersIndex;
