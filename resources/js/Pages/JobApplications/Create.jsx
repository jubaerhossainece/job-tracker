import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { router } from "@inertiajs/react";
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter
} from "@/components/ui/card";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/custom-button"; // Keeping your custom button
import { DatePicker } from "@/components/ui/date-picker"; // Keeping your custom date picker
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FileInput } from "@/components/ui/FileInput"; // Keeping your custom file input
import { Label } from "@/components/ui/label";
import { CalendarDays, Building2, BriefcaseBusiness, MapPin, Link2, FileText, FileEdit } from 'lucide-react';

const JobApplicationCreate = () => {
    // Format today's date as YYYY-MM-DD
    const formatDateToYMD = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const today = formatDateToYMD(new Date());
    
    // Use only Inertia form - this was the main issue, not the custom components
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: "",
        position_title: "",
        status: "applied",
        applied_at: today,
        job_url: "",
        location: "",
        notes: "",
        resume: null,
        cover_letter: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Use Inertia's post method with file upload support
        post(route('applications.store'), {
            forceFormData: true, // This ensures multipart/form-data for file uploads
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            }
        });
    };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Job Application</h1>
            <p className="mt-2 text-sm text-gray-600">
              Track your job applications and keep all important information in one place.
            </p>
          </div>
          <Link href={route("applications.index")}>
            <Button variant="outline">← Back to List</Button>
          </Link>
        </div>
      </div>

            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Job Application Details</CardTitle>
                    <CardDescription>
                        Enter the details for your new job application. Fields marked with * are required.
                    </CardDescription>
                </CardHeader>
                
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        {/* Company and Position Section */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Building2 size={16} />
                                    Company Name *
                                </Label>
                                <Input
                                    placeholder="Enter company name"
                                    value={data.company_name}
                                    onChange={(e) => setData('company_name', e.target.value)}
                                    required
                                />
                                {errors.company_name && (
                                    <p className="text-sm text-red-500">{errors.company_name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <BriefcaseBusiness size={16} />
                                    Position Title *
                                </Label>
                                <Input
                                    placeholder="Enter position title"
                                    value={data.position_title}
                                    onChange={(e) => setData('position_title', e.target.value)}
                                    required
                                />
                                {errors.position_title && (
                                    <p className="text-sm text-red-500">{errors.position_title}</p>
                                )}
                            </div>
                        </div>

                        {/* Status and Date Section */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Application Status *</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) => setData('status', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="applied">Applied</SelectItem>
                                        <SelectItem value="interview">Interview</SelectItem>
                                        <SelectItem value="offer">Offer</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-red-500">{errors.status}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <CalendarDays size={16} />
                                    Date Applied *
                                </Label>
                                {/* Using your custom DatePicker */}
                                <DatePicker
                                    value={data.applied_at ? new Date(data.applied_at) : new Date()}
                                    onChange={(date) => {
                                        if (date instanceof Date && !isNaN(date)) {
                                            const formattedDate = formatDateToYMD(date);
                                            setData('applied_at', formattedDate);
                                        }
                                    }}
                                />
                                {errors.applied_at && (
                                    <p className="text-sm text-red-500">{errors.applied_at}</p>
                                )}
                            </div>
                        </div>

                        {/* Location and URL Section */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    Location *
                                </Label>
                                <Input
                                    placeholder="City, State or Remote"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    required
                                />
                                {errors.location && (
                                    <p className="text-sm text-red-500">{errors.location}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Link2 size={16} />
                                    Job URL
                                </Label>
                                <Input
                                    type="url"
                                    placeholder="https://example.com/job-posting"
                                    value={data.job_url}
                                    onChange={(e) => setData('job_url', e.target.value)}
                                />
                                {errors.job_url && (
                                    <p className="text-sm text-red-500">{errors.job_url}</p>
                                )}
                            </div>
                        </div>

                        {/* Resume Section - Using your custom FileInput */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <FileText size={16} />
                                Resume
                            </Label>
                            <FileInput
                                className="w-full"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                    const file = e.target.files[0] || null;
                                    setData('resume', file);
                                }}
                            />
                            <p className="text-sm text-gray-500">Upload your resume (PDF, DOC, DOCX)</p>
                            {errors.resume && (
                                <p className="text-sm text-red-500">{errors.resume}</p>
                            )}
                        </div>

                        {/* Cover Letter Section */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <FileEdit size={16} />
                                Cover Letter
                            </Label>
                            <Textarea
                                placeholder="Enter your cover letter text here"
                                className="min-h-[200px]"
                                value={data.cover_letter}
                                onChange={(e) => setData('cover_letter', e.target.value)}
                            />
                            {errors.cover_letter && (
                                <p className="text-sm text-red-500">{errors.cover_letter}</p>
                            )}
                        </div>

                        {/* Notes Section */}
                        <div className="space-y-2">
                            <Label>Notes</Label>
                            <Textarea
                                placeholder="Additional notes about this application"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                            />
                            {errors.notes && (
                                <p className="text-sm text-red-500">{errors.notes}</p>
                            )}
                        </div>
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
                        {/* Using your CustomButton */}
                        <CustomButton 
                            type="submit"
                            disabled={processing}
                            className="px-6"
                        >
                            {processing ? "Saving..." : "Save Application"}
                        </CustomButton>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

JobApplicationCreate.layout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default JobApplicationCreate;