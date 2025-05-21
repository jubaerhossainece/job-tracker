import React, { useState } from "react";
import { useForm as useInertiaForm, Link } from "@inertiajs/react";
import { useForm as useReactHookForm } from "react-hook-form";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/custom-button";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { FileInput } from "@/components/ui/FileInput";
import { CalendarDays, Building2, BriefcaseBusiness, MapPin, Link2, FileText, FileEdit } from "lucide-react";

const JobApplicationCreate = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Separate the form for react-hook-form and Inertia form handling
    const inertiaForm = useInertiaForm({
        company_name: "",
        position_title: "",
        status: "applied",
        applied_at: new Date().toISOString().substr(0, 10), // Current date in YYYY-MM-DD format
        job_url: "",
        location: "",
        notes: "",
        resume: null,
        cover_letter: "",
    });
    
    // Create separate form for react-hook-form (shadcn/ui forms)
    const form = useReactHookForm({
        defaultValues: {
            company_name: "",
            position_title: "",
            status: "applied",
            applied_at: new Date().toISOString().substr(0, 10),
            job_url: "",
            location: "",
            notes: "",
            resume: null,
            cover_letter: "",
        }
    });

    const handleSubmit = (values) => {
        // Prevent double submission
        if (isSubmitting) {
            return;
        }
        
        // Set submitting state immediately
        setIsSubmitting(true);
        
        // Create a new FormData instance
        const formData = new FormData();
        
        // Add all form values to FormData
        for (const key in values) {
            // Skip null values except for specific fields that should allow null
            if (values[key] === null && !['resume', 'cover_letter', 'notes', 'job_url'].includes(key)) {
                continue;
            }
            
            // Special handling for files
            if (key === 'resume' && values[key] instanceof File) {
                formData.append(key, values[key]);
            }
            // Handle other data types
            else {
                formData.append(key, values[key] || '');
            }
        }
        
        // Submit the form with FormData
        inertiaForm.post(route('applications.store'), formData, {
            forceFormData: true, // Important for file uploads
            onSuccess: () => {
                form.reset();
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
            preserveScroll: true,
        });
    };

    return (
        <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <nav className="flex mb-2" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 text-sm text-gray-500">
                                <li>
                                    <Link href={route('applications.index')} className="hover:text-gray-700">Applications</Link>
                                </li>
                                <li className="flex items-center space-x-1">
                                    <span>/</span>
                                    <span className="text-gray-700">New Application</span>
                                </li>
                            </ol>
                        </nav>
                        <h1 className="text-3xl font-bold text-gray-900">Add New Job Application</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Track your job applications and keep all important information in one place.
                        </p>
                    </div>
                    <Link href={route('applications.index')}>
                        <Button variant="outline" className="gap-2">
                            <span>←</span> Back to List
                        </Button>
                    </Link>
                </div>
            </div>

            <Card className="max-w-4xl mx-auto shadow-sm">
                <CardHeader className="border-b bg-gray-50/50">
                    <CardTitle className="text-xl">Job Application Details</CardTitle>
                    <CardDescription className="text-gray-600">
                        Fill in the details below to track your job application. Fields marked with * are required.
                    </CardDescription>
                </CardHeader>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
                        <CardContent className="space-y-6">
                            {/* Company and Position Section */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="company_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Building2 size={16} />
                                                Company Name *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter company name"
                                                    {...field}
                                                    required
                                                />
                                            </FormControl>
                                            {inertiaForm.errors.company_name && (
                                                <FormMessage>{inertiaForm.errors.company_name}</FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="position_title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <BriefcaseBusiness size={16} />
                                                Position Title *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter position title"
                                                    {...field}
                                                    required
                                                />
                                            </FormControl>
                                            {inertiaForm.errors.position_title && (
                                                <FormMessage>{inertiaForm.errors.position_title}</FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Status and Date Section */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Application Status *</FormLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="applied">Applied</SelectItem>
                                                        <SelectItem value="interview">Interview</SelectItem>
                                                        <SelectItem value="offer">Offer</SelectItem>
                                                        <SelectItem value="rejected">Rejected</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {inertiaForm.errors.status && (
                                                <FormMessage>{inertiaForm.errors.status}</FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="applied_at"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <CalendarDays size={16} />
                                                Date Applied *
                                            </FormLabel>
                                            <FormControl>
                                                <DatePicker
                                                    value={field.value ? new Date(field.value) : undefined}
                                                    onChange={field.onChange}
                                                    {...field}
                                                />
                                            </FormControl>
                                            {inertiaForm.errors.applied_at && (
                                                <FormMessage>{inertiaForm.errors.applied_at}</FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Location and URL Section */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <MapPin size={16} />
                                                Location *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="City, State or Remote"
                                                    {...field}
                                                    required
                                                />
                                            </FormControl>
                                            {inertiaForm.errors.location && (
                                                <FormMessage>{inertiaForm.errors.location}</FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="job_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Link2 size={16} />
                                                Job URL
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="url"
                                                    placeholder="https://example.com/job-posting"
                                                    {...field}
                                                />
                                            </FormControl>
                                            {inertiaForm.errors.job_url && (
                                                <FormMessage>{inertiaForm.errors.job_url}</FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Resume Section */}
                            <FormField
                                control={form.control}
                                name="resume"
                                render={({ field: { value, onChange, ...fieldProps } }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <FileText size={16} />
                                            Resume
                                        </FormLabel>
                                        <FormControl>
                                            <FileInput
                                                className="w-full"
                                                {...fieldProps}
                                                onChange={(e) => {
                                                    const file = e.target.files[0] || null;
                                                    onChange(file);
                                                }}
                                            />
                                        </FormControl>
                                        <p className="text-sm text-gray-500">Upload your resume (PDF, DOC, DOCX)</p>
                                        {inertiaForm.errors.resume && (
                                            <FormMessage>{inertiaForm.errors.resume}</FormMessage>
                                        )}
                                    </FormItem>
                                )}
                            />

                            {/* Cover Letter Section */}
                            <FormField
                                control={form.control}
                                name="cover_letter"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <FileEdit size={16} />
                                            Cover Letter
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter your cover letter text here"
                                                className="min-h-[200px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        {inertiaForm.errors.cover_letter && (
                                            <FormMessage>{inertiaForm.errors.cover_letter}</FormMessage>
                                        )}
                                    </FormItem>
                                )}
                            />

                            {/* Notes Section */}
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Additional notes about this application"
                                                {...field}
                                            />
                                        </FormControl>
                                        {inertiaForm.errors.notes && (
                                            <FormMessage>{inertiaForm.errors.notes}</FormMessage>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </CardContent>

                        <CardFooter className="flex justify-between">
                            <Link href={route('applications.index')}>
                                <Button 
                                    variant="outline" 
                                    type="button"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <CustomButton 
                                type="submit"
                                disabled={isSubmitting || form.formState.isSubmitting}
                                className="px-6"
                            >
                                {isSubmitting ? "Saving..." : "Save Application"}
                            </CustomButton>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
};

JobApplicationCreate.layout = (page) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default JobApplicationCreate;
