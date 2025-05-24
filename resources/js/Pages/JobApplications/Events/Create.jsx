"use client";
import { useForm, Link } from "@inertiajs/react";
import React from "react";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { CustomDatePicker } from "@/components/ui/custom/custom-date-picker";

const EventCreate = ({ application }) => {
    const { data, setData, post, processing, errors } = useForm({
        event_type: "",
        title: "",
        event_date: new Date().toISOString().split("T")[0],
        event_time: "",
        notes: "",
        interviewer_name: "",
        interviewer_email: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleEventTypeChange = (value) => {
        const title = value
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        setData("event_type", value);
        setData("title", title);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("applications.events.store", application.id));
    };

    const eventTypes = [
        { value: "application_submitted", label: "Application Submitted" },
        { value: "application_viewed", label: "Application Viewed" },
        { value: "phone_screen", label: "Phone Screen" },
        { value: "technical_interview", label: "Technical Interview" },
        { value: "behavioral_interview", label: "Behavioral Interview" },
        { value: "take_home_assignment", label: "Take-home Assignment" },
        { value: "onsite_interview", label: "Onsite Interview" },
        { value: "reference_check", label: "Reference Check" },
        { value: "offer_received", label: "Offer Received" },
        { value: "offer_accepted", label: "Offer Accepted" },
        { value: "offer_declined", label: "Offer Declined" },
        { value: "rejection", label: "Rejection" },
        { value: "follow_up", label: "Follow Up" },
        { value: "other", label: "Other" },
    ];

    return (
        <>
            <div className="mb-6 flex items-center">
                <Button variant="ghost" size="icon" asChild className="mr-2">
                    <Link href={route("applications.show", application.id)}>
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Add Timeline Event</h1>
            </div>

            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle>New Event</CardTitle>
                    <CardDescription>
                        Add a new event to track the progress of your job application.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {/* Event Type */}
                        <div className="space-y-2">
                            <Label htmlFor="event_type" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Event Type
                            </Label>
                            <Select value={data.event_type} onValueChange={handleEventTypeChange}>
                                <SelectTrigger id="event_type">
                                    <SelectValue placeholder="Select event type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {eventTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.event_type && (
                                <p className="text-sm text-red-500">{errors.event_type}</p>
                            )}
                        </div>

                        {/* Event Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Event Title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter event title"
                                value={data.title}
                                onChange={handleChange}
                                required
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="event_date" className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Event date *
                                </Label>
                                <CustomDatePicker
                                    value={data.event_date}
                                    onChange={(date) => setData("event_date", date)}
                                />
                                {errors.event_date && (
                                    <p className="text-sm text-red-500">{errors.event_date}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="event_time">Time (Optional)</Label>
                                <Input
                                    id="event_time"
                                    name="event_time"
                                    type="time"
                                    value={data.event_time}
                                    onChange={handleChange}
                                />
                                {errors.event_time && (
                                    <p className="text-sm text-red-500">{errors.event_time}</p>
                                )}
                            </div>
                        </div>

                        {/* Interview Fields */}
                        {(data.event_type === "phone_screen" ||
                            data.event_type === "technical_interview" ||
                            data.event_type === "behavioral_interview" ||
                            data.event_type === "onsite_interview") && (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="interviewer_name">Interviewer Name</Label>
                                    <Input
                                        id="interviewer_name"
                                        name="interviewer_name"
                                        placeholder="Enter interviewer name"
                                        value={data.interviewer_name}
                                        onChange={handleChange}
                                    />
                                    {errors.interviewer_name && (
                                        <p className="text-sm text-red-500">{errors.interviewer_name}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="interviewer_email">Interviewer Email</Label>
                                    <Input
                                        id="interviewer_email"
                                        name="interviewer_email"
                                        type="email"
                                        placeholder="Enter interviewer email"
                                        value={data.interviewer_email}
                                        onChange={handleChange}
                                    />
                                    {errors.interviewer_email && (
                                        <p className="text-sm text-red-500">{errors.interviewer_email}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Notes */}
                        <div className="space-y-2">
                            <Label htmlFor="notes" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Notes
                            </Label>
                            <Textarea
                                id="notes"
                                name="notes"
                                placeholder="Add any additional details about this event"
                                value={data.notes}
                                onChange={handleChange}
                                rows={4}
                            />
                            {errors.notes && <p className="text-sm text-red-500">{errors.notes}</p>}
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button variant="outline" type="button" asChild>
                            <Link href={route("applications.show", application.id)}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Save Event
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    );
};

EventCreate.layout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EventCreate;
