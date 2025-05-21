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
    AlertTriangle,
    Edit
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
                return { variant: "secondary", className: "bg-blue-600 hover:bg-blue-700 text-white font-medium" };
            case 'interview':
                return { variant: "secondary", className: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium" };
            case 'offer':
                return { variant: "secondary", className: "bg-emerald-600 hover:bg-emerald-700 text-white font-medium" };
            case 'rejected':
                return { variant: "secondary", className: "bg-rose-600 hover:bg-rose-700 text-white font-medium" };
            default:
                return { variant: "secondary", className: "bg-gray-600 hover:bg-gray-700 text-white font-medium" };
        }
    };

    // Status card header colors
    const getStatusColors = (status) => {
        switch(status?.toLowerCase()) {
            case 'applied':
                return 'bg-blue-50 border-blue-100';
            case 'interview':
                return 'bg-indigo-50 border-indigo-100';
            case 'offer':
                return 'bg-emerald-50 border-emerald-100';
            case 'rejected':
                return 'bg-rose-50 border-rose-100';
            default:
                return 'bg-gray-50 border-gray-100';
        }
    };
    
    return (
        <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <nav className="flex mb-2" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 text-sm text-gray-500">
                                <li>
                                    <Link href={route('applications.index')} className="hover:text-gray-700">Applications</Link>
                                </li>
                                <li className="flex items-center space-x-1">
                                    <span>/</span>
                                    <span className="text-gray-700">View Application</span>
                                </li>
                            </ol>
                        </nav>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {application.position_title}
                            </h1>
                            <Badge {...getStatusVariant(application.status)} className="text-base py-1 px-3">
                                {application.status}
                            </Badge>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                            <Building2 className="text-gray-500" size={16} />
                            {application.company_name}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href={route('applications.index')}>
                            <Button variant="outline" className="gap-2">
                                <span>←</span> Back to List
                            </Button>
                        </Link>
                        <Link href={route('applications.edit', application.id)}>
                            <CustomButton className="gap-2">
                                <Edit size={16} />
                                Edit
                            </CustomButton>
                        </Link>
                    </div>
                </div>
            </div>

            <Card className="max-w-4xl mx-auto shadow-sm">
                <CardHeader className={`border-b ${getStatusColors(application.status)}`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-xl">Application Details</CardTitle>
                            <CardDescription className="text-gray-600">
                                Application Status: <span className="font-medium">{application.status.charAt(0).toUpperCase() + application.status.slice(1)}</span>
                            </CardDescription>
                        </div>
                        <Badge {...getStatusVariant(application.status)} className="text-base py-1 px-3">
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
