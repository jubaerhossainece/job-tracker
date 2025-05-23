"use client";
import { useForm, Link } from "@inertiajs/react";
import React, { useState } from "react";
import {
    ArrowLeft,
    Building2,
    Briefcase,
    MapPin,
    Calendar,
    ExternalLink,
    FileText,
    User,
    Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { DatePicker } from "@/components/ui/date-picker";
import { CustomDatePicker } from "@/components/ui/custom/custom-date-picker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/Layouts/DashboardLayout";

const JobApplicationCreate = () => {
    // Format today's date as YYYY-MM-DD
    const formatDateToYMD = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const today = formatDateToYMD(new Date());

    // Use Inertia's useForm hook
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: "",
        position_title: "",
        location: "",
        status: "applied",
        applied_at: today,
        job_url: "",
        notes: "",
        cover_letter: "",
        resume: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use Inertia's post method with file upload support
        post(route("applications.store"), {
            forceFormData: true, // This ensures multipart/form-data for file uploads
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                console.error("Form submission errors:", errors);
            },
        });
    };

    return (
        <>
            <div className="mb-6 flex items-center">
                <Button variant="ghost" size="icon" asChild className="mr-2">
                    <Link href={route("applications.index")}>
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Add New Job Application</h1>
            </div>

            <Card className="mx-auto max-w-3xl">
                <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                    <CardDescription>
                        Enter the details of the job you've applied for.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="company_name"
                                    className="flex items-center gap-2"
                                >
                                    <Building2 className="h-4 w-4" />
                                    Company Name *
                                </Label>
                                <Input
                                    id="company_name"
                                    name="company_name"
                                    placeholder="Enter company name"
                                    value={data.company_name}
                                    onChange={(e) =>
                                        setData("company_name", e.target.value)
                                    }
                                    required
                                />
                                {errors.company_name && (
                                    <p className="text-sm text-red-500">
                                        {errors.company_name}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="position_title"
                                    className="flex items-center gap-2"
                                >
                                    <Briefcase className="h-4 w-4" />
                                    Position Title *
                                </Label>
                                <Input
                                    id="position_title"
                                    name="position_title"
                                    placeholder="Enter job title"
                                    value={data.position_title}
                                    onChange={(e) =>
                                        setData(
                                            "position_title",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                {errors.position_title && (
                                    <p className="text-sm text-red-500">
                                        {errors.position_title}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="location"
                                    className="flex items-center gap-2"
                                >
                                    <MapPin className="h-4 w-4" />
                                    Location *
                                </Label>
                                <Input
                                    id="location"
                                    name="location"
                                    placeholder="City, State or Remote"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                    required
                                />
                                {errors.location && (
                                    <p className="text-sm text-red-500">
                                        {errors.location}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
  <Label htmlFor="applied_at" className="flex items-center gap-2">
    <Calendar className="h-4 w-4" />
    Applied Date *
  </Label>
  <CustomDatePicker 
    value={data.applied_at}
    onChange={(date) => setData("applied_at", date)}
  />
  {errors.applied_at && <p className="text-sm text-red-500">{errors.applied_at}</p>}
</div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="job_url"
                                    className="flex items-center gap-2"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Job URL
                                </Label>
                                <Input
                                    id="job_url"
                                    name="job_url"
                                    type="url"
                                    placeholder="https://example.com/job"
                                    value={data.job_url}
                                    onChange={(e) =>
                                        setData("job_url", e.target.value)
                                    }
                                />
                                {errors.job_url && (
                                    <p className="text-sm text-red-500">
                                        {errors.job_url}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="status"
                                    className="flex items-center gap-2"
                                >
                                    <FileText className="h-4 w-4" />
                                    Application Status *
                                </Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) =>
                                        setData("status", value)
                                    }
                                >
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="applied">
                                            Applied
                                        </SelectItem>
                                        <SelectItem value="interview">
                                            Interview
                                        </SelectItem>
                                        <SelectItem value="offer">
                                            Offer
                                        </SelectItem>
                                        <SelectItem value="rejected">
                                            Rejected
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-red-500">
                                        {errors.status}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="resume"
                                className="flex items-center gap-2"
                            >
                                <Upload className="h-4 w-4" />
                                Resume
                            </Label>
                            <Input
                                id="resume"
                                name="resume"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                    const file = e.target.files[0] || null;
                                    setData("resume", file);
                                }}
                                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            />
                            <p className="text-xs text-muted-foreground">
                                Upload your resume (PDF, DOC, DOCX)
                            </p>
                            {errors.resume && (
                                <p className="text-sm text-red-500">
                                    {errors.resume}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="cover_letter"
                                className="flex items-center gap-2"
                            >
                                <User className="h-4 w-4" />
                                Cover Letter
                            </Label>
                            <Textarea
                                id="cover_letter"
                                name="cover_letter"
                                placeholder="Enter your cover letter content"
                                value={data.cover_letter}
                                onChange={(e) =>
                                    setData("cover_letter", e.target.value)
                                }
                                rows={4}
                            />
                            {errors.cover_letter && (
                                <p className="text-sm text-red-500">
                                    {errors.cover_letter}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="notes"
                                className="flex items-center gap-2"
                            >
                                <FileText className="h-4 w-4" />
                                Notes
                            </Label>
                            <Textarea
                                id="notes"
                                name="notes"
                                placeholder="Add any additional notes about this job application"
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                                rows={3}
                            />
                            {errors.notes && (
                                <p className="text-sm text-red-500">
                                    {errors.notes}
                                </p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" type="button" asChild>
                            <Link href={route("applications.index")}>
                                Cancel
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? "Saving..." : "Save Job Application"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    );
};

JobApplicationCreate.layout = (page) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default JobApplicationCreate;
