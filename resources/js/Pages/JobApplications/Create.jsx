"use client"

import { useState } from "react"
import { router, route } from "@inertiajs/react"
import { Link } from "@inertiajs/react"
import { ArrowLeft, Building2, Briefcase, MapPin, Calendar, ExternalLink, FileText, User, Upload } from "lucide-react"
// import { Button } from "@/Components/ui/button"
   import { Button } from "@/Components/ui/button"; // Ensure the casing matches
   
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Textarea } from "@/Components/ui/textarea"
import DashboardLayout from "@/Layouts/DashboardLayout"

const JobApplicationCreate = () => {
  const [values, setValues] = useState({
    company_name: "",
    position_title: "",
    location: "",
    status: "applied",
    applied_at: new Date().toISOString().split("T")[0],
    job_url: "",
    notes: "",
    cover_letter: "",
  })

  const [resumeFile, setResumeFile] = useState(null)

  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0])
  }

  const handleStatusChange = (value) => {
    setValues((values) => ({
      ...values,
      status: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Create form data to handle file upload
    const formData = new FormData()

    // Add all form values
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key])
    })

    // Add resume file if selected
    if (resumeFile) {
      formData.append("resume_file", resumeFile)
    }

    // Submit with Inertia router
    router.post(route("job-applications.store"), formData, {
      forceFormData: true,
    })
  }

  return (
    <>
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href={route("job-applications.index")}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Add New Job Application</h1>
      </div>

      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>Enter the details of the job you've applied for.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company_name" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Company Name
                </Label>
                <Input
                  id="company_name"
                  name="company_name"
                  placeholder="Enter company name"
                  value={values.company_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position_title" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Position Title
                </Label>
                <Input
                  id="position_title"
                  name="position_title"
                  placeholder="Enter job title"
                  value={values.position_title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, State or Remote"
                  value={values.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applied_at" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Applied Date
                </Label>
                <Input
                  id="applied_at"
                  name="applied_at"
                  type="date"
                  value={values.applied_at}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="job_url" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Job URL
                </Label>
                <Input
                  id="job_url"
                  name="job_url"
                  type="url"
                  placeholder="https://example.com/job"
                  value={values.job_url}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Application Status
                </Label>
                <Select value={values.status} onValueChange={handleStatusChange}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume_file" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Resume Upload
              </Label>
              <Input
                id="resume_file"
                name="resume_file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              <p className="text-xs text-muted-foreground">Upload your resume (PDF, DOC, DOCX)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover_letter" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Cover Letter
              </Label>
              <Textarea
                id="cover_letter"
                name="cover_letter"
                placeholder="Enter your cover letter content"
                value={values.cover_letter}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Add any additional notes about this job application"
                value={values.notes}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" asChild>
              <Link href={route("job-applications.index")}>Cancel</Link>
            </Button>
            <Button type="submit">Save Job Application</Button>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}

JobApplicationCreate.layout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default JobApplicationCreate
