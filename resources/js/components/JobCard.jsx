import { useForm, Link } from "@inertiajs/react";
import { Building2, Calendar, ExternalLink, MapPin, MoreHorizontal, FileText, User, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { route } from "inertiajs"

export default function JobCard({ job }) {
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
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              {job.position_title}
            </CardTitle>
            <CardDescription className="flex items-center">
              <Building2 className="mr-1 h-3 w-3" />
              {job.company_name}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={route("applications.show", job.id)}>View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={route("applications.edit", job.id)}>Edit</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{job.location}</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>Applied on {new Date(job.applied_at).toLocaleDateString()}</span>
        </div>
        {job.resume_path && (
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            <span>Resume attached</span>
          </div>
        )}
        {job.cover_letter && (
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span>Cover letter included</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <Badge className={getStatusColor(job.status)} variant="secondary">
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </Badge>
        {job.job_url && (
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <a href={job.job_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Open job posting</span>
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
