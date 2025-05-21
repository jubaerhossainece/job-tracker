import React, { useState } from "react";
import { useForm as useInertiaForm, Link, usePage } from "@inertiajs/react";
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
import { Badge } from "@/components/ui/badge";
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

// Status badge variants helper
const getStatusVariant = (status) => {
    switch(status?.toLowerCase()) {
        case 'applied':
            return { variant: "secondary", className: "bg-blue-600 hover:bg-blue-700 text-white font-medium" };
        case 'interview':
            return { variant: "secondary", className: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium" };
        case 'offer':
            return { variant: "secondary", className: "bg-emerald-600 hover:bg-emerald-700 text-white font-medium" };
        case 'rejected':
            return { variant: "secondary", className: "bg-rose-600 hover:bg-rose-700 text-white font-medium" };
        default:
            return { variant: "secondary", className: "bg-gray-600 hover:bg-gray-700 text-white font-medium" };
    }
};

// Status card header colors helper
const getStatusColors = (status) => {
    switch(status?.toLowerCase()) {
        case 'applied':
            return 'bg-blue-50 border-blue-100';
        case 'interview':
            return 'bg-indigo-50 border-indigo-100';
        case 'offer':
            return 'bg-emerald-50 border-emerald-100';
        case 'rejected':
            return 'bg-rose-50 border-rose-100';
        default:
            return 'bg-gray-50 border-gray-100';
    }
};

const JobApplicationEdit = () => {
    const { application } = usePage().props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Separate the form for react-hook-form and Inertia form handling
    const inertiaForm = useInertiaForm({
        company_name: application.company_name,
        position_title: application.position_title,
        status: application.status,
        applied_at: application.applied_at.substr(0, 10), // Format YYYY-MM-DD
        job_url: application.job_url || '',
        location: application.location,
        notes: application.notes || '',
        resume: null,
        cover_letter: application.cover_letter || '',
    });
    
    // Create separate form for react-hook-form (shadcn/ui forms)
    const form = useReactHookForm({
        defaultValues: {
            company_name: application.company_name,
            position_title: application.position_title,
            status: application.status,
            applied_at: application.applied_at.substr(0, 10), // Format YYYY-MM-DD
            job_url: application.job_url || '',
            location: application.location,
            notes: application.notes || '',
            resume: null,
            cover_letter: application.cover_letter || '',
        }
    });

    const handleSubmit = (values) => {
        // Prevent double submission
        if (isSubmitting) {
            return;
        }
        
        // Set submitting state immediately
        setIsSubmitting(true);
        
        try {
            // Create a new FormData instance
            const formData = new FormData();
            
            // Add _method for Laravel to handle PUT request
            formData.append('_method', 'PUT');
            
            // Add all form values to FormData
            Object.keys(values).forEach(key => {
                // Skip null/undefined values for required fields
                if (values[key] === null && ['company_name', 'position_title', 'status', 'applied_at', 'location'].includes(key)) {
                    return;
                }
                
                // Handle date field
                if (key === 'applied_at' && values[key]) {
                    const date = new Date(values[key]);
                    formData.append(key, date.toISOString().split('T')[0]);
                    return;
                }
                
                // Handle file upload
                if (key === 'resume' && values[key] instanceof File) {
                    formData.append(key, values[key]);
                    return;
                }
            
            // Handle optional fields that can be null/empty
            if (key === 'job_url' || key === 'cover_letter' || key === 'notes') {
                formData.append(key, values[key] || '');
                continue;
            }
            
            // Handle all other required fields
            if (values[key] !== null && values[key] !== undefined) {
                formData.append(key, values[key]);
            }
        }
        
        // Submit the form with FormData and _method for proper PUT handling
        formData.append('_method', 'PUT');
        inertiaForm.put(route('applications.update', application.id), formData, {
            forceFormData: true, // Important for file uploads
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
            preserveScroll: true
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
                                    <span className="text-gray-700">Edit Application</span>
                                </li>
                            </ol>
                        </nav>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Edit {application.position_title} at {application.company_name}
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Update the application details and track your progress.
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
                <CardHeader className={`border-b ${getStatusColors(application.status)}`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-xl">Application Details</CardTitle>
                            <CardDescription className="text-gray-600">
                                Update the details below. Fields marked with * are required.
                            </CardDescription>
                        </div>
                        <Badge {...getStatusVariant(application.status)} className="text-base py-1 px-3">
                            {application.status}
                        </Badge>
                    </div>
                </CardHeader>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
                        <CardContent className="pt-6 space-y-6">
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
                                        <p className="text-sm text-gray-500">
                                            {application.resume_path 
                                                ? "Current resume on file. Upload a new one to replace it."
                                                : "Upload your resume (PDF, DOC, DOCX)"}
                                        </p>
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
                                {isSubmitting ? "Saving..." : "Update Application"}
                            </CustomButton>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
};

JobApplicationEdit.layout = (page) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default JobApplicationEdit;
