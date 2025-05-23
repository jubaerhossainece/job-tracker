import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/badge";
import { 
    Calendar,
    Building2,
    BriefcaseBusiness,
    MapPin,
    Link2,
    FileText,
    FileEdit,
    Clock,
    Trash2,
    AlertTriangle,
    Edit,
    ArrowLeft,
    ExternalLink,
    User,
    Briefcase,
    Download,
    Upload
} from "lucide-react";


const JobApplicationShow = ({ application, events }) => {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this job application?")) {
      router.delete(route("applications.destroy", application.id))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "applied":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "interview":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      case "offer":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <>
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href={route("applications.index")}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Job Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    {application.position_title}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Building2 className="mr-1 h-4 w-4" />
                    {application.company_name}
                  </CardDescription>
                </div>
                <Badge className={`${getStatusColor(application.status)} mt-2 sm:mt-0`} variant="secondary">
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{application.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Applied on {new Date(application.applied_at).toLocaleDateString()}</span>
                </div>
              </div>

              {application.cover_letter && (
                <div>
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <User className="h-4 w-4" />
                    Cover Letter
                  </h3>
                  <div className="bg-muted/50 p-3 rounded-md">
                    <p className="whitespace-pre-line text-sm">{application.cover_letter}</p>
                  </div>
                </div>
              )}

              {application.notes && (
                <div>
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4" />
                    Notes
                  </h3>
                  <p className="whitespace-pre-line text-sm bg-muted/50 p-3 rounded-md">{application.notes}</p>
                </div>
              )}

              {application.resume_path && (
                <div>
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <Upload className="h-4 w-4" />
                    Resume
                  </h3>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Resume</span>
                    <Button variant="ghost" size="sm" className="ml-auto" asChild>
                      <a
                        href={route("applications.resume.download", application.id)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {events && events.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Application Timeline</h3>
                  <div className="space-y-3">
                    {events.map((event) => (
                      <div key={event.id} className="flex gap-3 border-l-2 border-muted pl-4 pb-2">
                        <div className="w-full">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.event_date).toLocaleDateString()}
                          </p>
                          {event.notes && <p className="mt-1 text-sm">{event.notes}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={route("applications.edit", application.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {application.job_url && (
                <Button className="w-full justify-start" variant="outline" asChild>
                  <a href={application.job_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Job Posting
                  </a>
                </Button>
              )}
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href={route("applications.events.create", application.id)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Add Timeline Event
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

JobApplicationShow.layout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default JobApplicationShow

