"use client"

import { useState } from "react"
import { Inertia } from "@inertiajs/inertia"
import { Link } from "@inertiajs/inertia-react"
import { ArrowLeft, Calendar, FileText } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Textarea } from "@/Components/ui/textarea"
import { route } from "@/Helpers/route"
import DashboardLayout from "@/Layouts/DashboardLayout"

const EventCreate = ({ application }) => {
  const [values, setValues] = useState({
    event_type: "",
    title: "",
    event_date: new Date().toISOString().split("T")[0],
    event_time: "",
    notes: "",
    interviewer_name: "",
    interviewer_email: "",
  })

  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }

  const handleEventTypeChange = (value) => {
    setValues((values) => {
      // Set a default title based on the event type
      const title = value
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      return {
        ...values,
        event_type: value,
        title: title,
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    Inertia.post(route("job-applications.events.store", jobApplication.id), values)
  }

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
  ]

  return (
    <>
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href={route("job-applications.show", jobApplication.id)}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Add Timeline Event</h1>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>New Event</CardTitle>
          <CardDescription>Add a new event to track the progress of your job application.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event_type" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Event Type
              </Label>
              <Select value={values.event_type} onValueChange={handleEventTypeChange}>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Event Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter event title"
                value={values.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="event_date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date
                </Label>
                <Input
                  id="event_date"
                  name="event_date"
                  type="date"
                  value={values.event_date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event_time">Time (Optional)</Label>
                <Input
                  id="event_time"
                  name="event_time"
                  type="time"
                  value={values.event_time}
                  onChange={handleChange}
                />
              </div>
            </div>

            {(values.event_type === "phone_screen" ||
              values.event_type === "technical_interview" ||
              values.event_type === "behavioral_interview" ||
              values.event_type === "onsite_interview") && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="interviewer_name">Interviewer Name</Label>
                  <Input
                    id="interviewer_name"
                    name="interviewer_name"
                    placeholder="Enter interviewer name"
                    value={values.interviewer_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interviewer_email">Interviewer Email</Label>
                  <Input
                    id="interviewer_email"
                    name="interviewer_email"
                    type="email"
                    placeholder="Enter interviewer email"
                    value={values.interviewer_email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Add any additional details about this event"
                value={values.notes}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" asChild>
              <Link href={route("job-applications.show", jobApplication.id)}>Cancel</Link>
            </Button>
            <Button type="submit">Save Event</Button>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}

EventCreate.layout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default EventCreate
