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
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Link } from "@inertiajs/react";

// Utility to format Date to YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

const JobApplicationCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = formatDate(new Date());

  const form = useForm({
    defaultValues: {
      company_name: "",
      position_title: "",
      status: "applied",
      applied_at: today,
      job_url: "",
      location: "",
      notes: "",
      resume: null,
      cover_letter: null,
    },
  });

  const { handleSubmit, setValue, register, reset, formState: { errors } } = form;

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof File || key === "resume" || key === "cover_letter") {
        if (value) formData.append(key, value);
      } else {
        formData.append(key, value ?? "");
      }
    });

    router.post(route("applications.store"), formData, {
      forceFormData: true,
      onSuccess: () => {
        if (window.Toast) window.Toast.success("Job application created successfully!");
        reset();
      },
      onError: (errors) => {
        if (window.Toast) window.Toast.error("Please fix the errors in the form.");
      },
      onFinish: () => setIsSubmitting(false),
      preserveScroll: true,
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

      {/* Form */}
      <Card className="max-w-4xl mx-auto shadow-sm">
        <CardHeader className="border-b bg-gray-50/50">
          <CardTitle className="text-xl">Job Application Details</CardTitle>
          <CardDescription className="text-gray-600">
            Fields marked with * are required.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-6">
                <FormField
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Google" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="position_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Backend Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
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
                            <SelectItem value="interviewing">Interviewing</SelectItem>
                            <SelectItem value="offer">Offer</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="applied_at"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Applied Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <FormField
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Remote or Berlin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="job_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/job-posting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Resume</FormLabel>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setValue("resume", e.target.files[0])}
                  />
                </FormItem>

                <FormItem>
                  <FormLabel>Cover Letter</FormLabel>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setValue("cover_letter", e.target.files[0])}
                  />
                </FormItem>
              </div>
            </CardContent>

            <CardContent>
              <FormField
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Add any extra details..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Application"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

JobApplicationCreate.layout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default JobApplicationCreate;
