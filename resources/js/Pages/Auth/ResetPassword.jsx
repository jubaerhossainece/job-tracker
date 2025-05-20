"use client"

import { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Briefcase, LockIcon, MailIcon } from 'lucide-react';
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <Head title="Reset Password" />
            
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-3 rounded-full shadow-md">
                        <Briefcase className="h-8 w-8 text-[#4747ff]" />
                    </div>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
                        <CardDescription className="text-center">
                            Enter your new password to reset your account
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        disabled
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={data.password}
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                            required
                                            autoFocus
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-sm text-red-500">{errors.password}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">Confirm New Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        required
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    {errors.password_confirmation && (
                                        <p className="text-sm text-red-500">{errors.password_confirmation}</p>
                                    )}
                                </div>
                            </div>

                            <CustomButton 
                                type="submit" 
                                className="w-full mt-6" 
                                disabled={processing}
                            >
                                {processing ? "Processing..." : "Reset Password"}
                            </CustomButton>
                        </form>
                    </CardContent>
                    
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-muted-foreground">
                            Remember your password?{" "}
                            <Link href={route("login")} className="text-[#4747ff] hover:text-[#3a3ae6] font-medium">
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
