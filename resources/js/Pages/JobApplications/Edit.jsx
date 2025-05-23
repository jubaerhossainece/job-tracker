import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomDatePicker } from "@/components/ui/custom/custom-date-picker";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
    FormMessage,
} from "@/components/ui/form";
import {
    Building2,
    MapPin,
    FileText,
    Briefcase,
    ArrowLeft,
    Calendar,
    ExternalLink,
    User,
    Upload,
} from "lucide-react";

const JobApplicationEdit = ({ application }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: application.company_name || "",
        position_title: application.position_title || "",
        location: application.location || "",
        status: application.status || "applied",
        applied_at:
            application.applied_at || new Date().toISOString().split("T")[0],
        job_url: application.job_url || "",
        notes: application.notes || "",
        cover_letter: application.cover_letter || "",
        resume: null,
        _method: "PUT", // required for PUT method
    });

    const [resumeFile, setResumeFile] = useState(null);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleFileChange = (e) => {
        setData("resume", e.target.files[0]);
    };

    const handleStatusChange = (value) => {
        setData("status", value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("applications.update", application.id), {
            forceFormData: true,
            onSuccess: () => {
                reset(); // optional — clears all fields including file
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
                    <Link href={route("applications.show", application.id)}>
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Edit Job Application</h1>
            </div>

            <Card className="mx-auto max-w-3xl">
                <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                    <CardDescription>
                        Update the details of your job application.
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
                                    Company Name
                                </Label>
                                <Input
                                    id="company_name"
                                    name="company_name"
                                    placeholder="Enter company name"
                                    value={data.company_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="position_title"
                                    className="flex items-center gap-2"
                                >
                                    <Briefcase className="h-4 w-4" />
                                    Position Title
                                </Label>
                                <Input
                                    id="position_title"
                                    name="position_title"
                                    placeholder="Enter job title"
                                    value={data.position_title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="location"
                                    className="flex items-center gap-2"
                                >
                                    <MapPin className="h-4 w-4" />
                                    Location
                                </Label>
                                <Input
                                    id="location"
                                    name="location"
                                    placeholder="City, State or Remote"
                                    value={data.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="applied_at"
                                    className="flex items-center gap-2"
                                >
                                    <Calendar className="h-4 w-4" />
                                    Applied Date *
                                </Label>
                                <CustomDatePicker
                                    id="applied_at"
                                    name="applied_at"
                                    value={application.applied_at}
                                    onChange={(date) =>
                                        setData("applied_at", date)
                                    }
                                    required
                                />
                                {/* {errors.applied_at && <p className="text-sm text-red-500">{errors.applied_at}</p>} */}
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
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="status"
                                    className="flex items-center gap-2"
                                >
                                    <FileText className="h-4 w-4" />
                                    Application Status
                                </Label>
                                <Select
                                    value={data.status}
                                    onValueChange={handleStatusChange}
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
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="resume_file"
                                className="flex items-center gap-2"
                            >
                                <Upload className="h-4 w-4" />
                                Resume Upload{" "}
                                {application.resume_path &&
                                    "(Leave empty to keep current resume)"}
                            </Label>
                            <Input
                                id="resume_file"
                                name="resume_file"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            />
                            <p className="text-xs text-muted-foreground">
                                Upload your resume (PDF, DOC, DOCX)
                            </p>
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
                                onChange={handleChange}
                                rows={4}
                            />
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
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" type="button" asChild>
                            <Link
                                href={route(
                                    "applications.show",
                                    application.id
                                )}
                            >
                                Cancel
                            </Link>
                        </Button>
                        <Button type="submit">Update Job Application</Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    );
};

JobApplicationEdit.layout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default JobApplicationEdit;
