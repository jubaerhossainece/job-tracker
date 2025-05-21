import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
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
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
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
    AlertTriangle
} from "lucide-react";

const JobApplicationShow = () => {
    const { application } = usePage().props;
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    
    // Handle delete confirmation
    const handleDelete = () => {
        router.delete(route('applications.destroy', application.id));
        setShowDeleteDialog(false);
    };
    
    // Format date helper function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        };
        return date.toLocaleDateString(undefined, options);
    };

    // Status badge variants
    const getStatusVariant = (status) => {
        switch(status?.toLowerCase()) {
            case 'applied':
                return { variant: "default", className: "bg-blue-500 hover:bg-blue-600" };
            case 'interview':
                return { variant: "secondary", className: "bg-purple-500 text-white hover:bg-purple-600" };
            case 'offer':
                return { variant: "default", className: "bg-green-500 hover:bg-green-600" };
            case 'rejected':
                return { variant: "destructive" };
            default:
                return { variant: "outline" };
        }
    };
    
    return (
        <div className="py-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">
                    {application.position_title} at {application.company_name}
                </h1>
                <div className="flex space-x-3">
                    <Link href={route('applications.index')}>
                        <Button variant="outline">
                            Back to List
                        </Button>
                    </Link>
                    <Link href={route('applications.edit', application.id)}>
                        <CustomButton>
                            Edit Application
                        </CustomButton>
                    </Link>
                </div>
            </div>

            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="text-gray-500" size={24} />
                                {application.company_name}
                            </CardTitle>
                            <CardDescription className="text-lg font-medium mt-1">
                                {application.position_title}
                            </CardDescription>
                        </div>
                        <Badge 
                            {...getStatusVariant(application.status)} 
                            className="text-base py-1 px-3"
                        >
                            {application.status}
                        </Badge>
                    </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                                    <Calendar size={14} />
                                    Applied on
                                </h3>
                                <p>{formatDate(application.applied_at)}</p>
                            </div>
                            
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                                    <MapPin size={14} />
                                    Location
                                </h3>
                                <p>{application.location}</p>
                            </div>
                            
                            {application.job_url && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                                        <Link2 size={14} />
                                        Job URL
                                    </h3>
                                    <a 
                                        href={application.job_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        {application.job_url}
                                    </a>
                                </div>
                            )}
                            
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                                    <Clock size={14} />
                                    Created/Updated
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Created: {formatDate(application.created_at)}<br />
                                    Updated: {formatDate(application.updated_at)}
                                </p>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            {application.resume_path && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-1">
                                        <FileText size={14} />
                                        Resume
                                    </h3>
                                    <a
                                        href={`/storage/${application.resume_path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        <FileText size={16} />
                                        View Resume
                                    </a>
                                </div>
                            )}
                            
                            {application.notes && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
                                    <div className="bg-gray-50 p-3 rounded-md whitespace-pre-wrap">
                                        {application.notes}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {application.cover_letter && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-1">
                                <FileEdit size={14} />
                                Cover Letter
                            </h3>
                            <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                                {application.cover_letter}
                            </div>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Link href={route('applications.index')}>
                        <Button variant="outline">
                            Back to List
                        </Button>
                    </Link>
                    <div className="space-x-2">
                        <Link href={route('applications.edit', application.id)}>
                            <CustomButton>
                                Edit Application
                            </CustomButton>
                        </Link>
                        <Button 
                            variant="destructive"
                            onClick={() => setShowDeleteDialog(true)}
                            className="flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            Delete
                        </Button>
                        
                        <ConfirmationDialog
                            isOpen={showDeleteDialog}
                            onClose={() => setShowDeleteDialog(false)}
                            onConfirm={handleDelete}
                            title="Delete Job Application"
                            description={`Are you sure you want to delete your ${application.position_title} application at ${application.company_name}? This action cannot be undone.`}
                            confirmText="Delete"
                            cancelText="Cancel"
                            variant="destructive"
                            icon={<AlertTriangle size={20} />}
                        />
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

JobApplicationShow.layout = (page) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default JobApplicationShow;
