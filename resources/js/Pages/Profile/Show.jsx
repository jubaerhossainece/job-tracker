import React from "react";
import { Head, usePage, useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CustomButton } from "@/components/ui/custom-button";
import { Separator } from "@/components/ui/separator";
import { UserCircle, Mail, Shield, Settings2, Calendar } from "lucide-react";

const ProfileShow = () => {
    const { user } = usePage().props;
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name,
        email: user.email,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <>
            <Head title="Profile" />

            <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Profile</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Manage your account settings and preferences
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Sidebar */}
                    <Card className="md:col-span-1">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    <UserCircle className="h-16 w-16 text-gray-400" />
                                </div>
                                <h2 className="text-xl font-semibold">{user.name}</h2>
                                <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                                <Badge className="mt-2" variant={user.email_verified_at ? "success" : "warning"}>
                                    {user.email_verified_at ? "Verified" : "Pending Verification"}
                                </Badge>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                                    <Calendar size={14} />
                                    <span>Joined {user.created_at}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main Content */}
                    <div className="md:col-span-2">
                        <Tabs defaultValue="general" className="space-y-6">
                            <TabsList>
                                <TabsTrigger value="general">General</TabsTrigger>
                                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                                <TabsTrigger value="security">Security</TabsTrigger>
                            </TabsList>

                            <TabsContent value="general">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>General Information</CardTitle>
                                        <CardDescription>
                                            Update your basic profile information
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={onSubmit} className="space-y-4">
                                            <div>
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    id="name"
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    error={errors.name}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    error={errors.email}
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <CustomButton
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    Save Changes
                                                </CustomButton>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="preferences">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Preferences</CardTitle>
                                        <CardDescription>
                                            Customize your application experience
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {/* Add preference settings here */}
                                        <p className="text-sm text-gray-500">Preference settings coming soon...</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="security">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Security Settings</CardTitle>
                                        <CardDescription>
                                            Manage your account security
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {/* Add security settings here */}
                                        <p className="text-sm text-gray-500">Security settings coming soon...</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
};

ProfileShow.layout = page => <DashboardLayout>{page}</DashboardLayout>;

export default ProfileShow;
