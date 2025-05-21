// resources/js/Pages/Applications/Index.jsx

import React, { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Search, Calendar, MapPin, FileText, FileCheck, Filter, ChevronDown, Edit, Eye } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const JobApplicationsIndex = () => {
    const { applications } = usePage().props;
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState({ field: "applied_at", ascending: false });

    // Get unique statuses for filter dropdown
    const uniqueStatuses = [...new Set(applications.map(app => app.status))];
    
    // Format date helper function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'short', 
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
            case 'offered':
                return { variant: "secondary", className: "bg-emerald-600 hover:bg-emerald-700 text-white font-medium" };
            case 'rejected':
                return { variant: "secondary", className: "bg-rose-600 hover:bg-rose-700 text-white font-medium" };
            default:
                return { variant: "secondary", className: "bg-gray-600 hover:bg-gray-700 text-white font-medium" };
        }
    };

    // Sort and filter applications
    useEffect(() => {
        let result = [...applications];
        
        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                app => 
                    app.company_name?.toLowerCase().includes(term) || 
                    app.position_title?.toLowerCase().includes(term) ||
                    app.location?.toLowerCase().includes(term)
            );
        }
        
        // Apply status filter
        if (statusFilter !== "all") {
            result = result.filter(app => app.status === statusFilter);
        }
        
        // Apply sorting
        result.sort((a, b) => {
            const fieldA = a[sortBy.field];
            const fieldB = b[sortBy.field];
            
            if (fieldA < fieldB) return sortBy.ascending ? -1 : 1;
            if (fieldA > fieldB) return sortBy.ascending ? 1 : -1;
            return 0;
        });
        
        setFilteredApplications(result);
    }, [applications, searchTerm, statusFilter, sortBy]);

    const handleSort = (field) => {
        setSortBy(prev => ({
            field,
            ascending: prev.field === field ? !prev.ascending : true
        }));
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold">Job Applications</h1>
                <Link href={route('applications.create')}>
                    <CustomButton className="flex items-center gap-2">
                        <span>Add New Application</span>
                        <span className="text-lg">+</span>
                    </CustomButton>
                </Link>
            </div>
            
            <Card className="mb-8">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input 
                                placeholder="Search companies, positions or locations..." 
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <Filter size={16} />
                                        <span>{statusFilter === "all" ? "All Statuses" : statusFilter}</span>
                                        <ChevronDown size={14} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                                            All Statuses
                                        </DropdownMenuItem>
                                        {uniqueStatuses.map((status) => (
                                            <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                                                {status}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    
                    <div className="rounded-md border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50">
                                    <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("company_name")}>
                                        Company
                                        {sortBy.field === "company_name" && (
                                            <span className="ml-1">{sortBy.ascending ? "↑" : "↓"}</span>
                                        )}
                                    </TableHead>
                                    <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("position_title")}>
                                        Position
                                        {sortBy.field === "position_title" && (
                                            <span className="ml-1">{sortBy.ascending ? "↑" : "↓"}</span>
                                        )}
                                    </TableHead>
                                    <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("status")}>
                                        Status
                                        {sortBy.field === "status" && (
                                            <span className="ml-1">{sortBy.ascending ? "↑" : "↓"}</span>
                                        )}
                                    </TableHead>
                                    <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("applied_at")}>
                                        Applied
                                        {sortBy.field === "applied_at" && (
                                            <span className="ml-1">{sortBy.ascending ? "↑" : "↓"}</span>
                                        )}
                                    </TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Documents</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredApplications.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                            No applications found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredApplications.map((app) => (
                                        <TableRow 
                                            key={app.id} 
                                            className="hover:bg-slate-50 cursor-pointer"
                                            onClick={() => window.location.href = route('applications.show', app.id)}
                                        >
                                            <TableCell className="font-medium">
                                                {app.company_name}
                                            </TableCell>
                                            <TableCell>{app.position_title}</TableCell>
                                            <TableCell>
                                                <Badge 
                                                    {...getStatusVariant(app.status)} 
                                                >
                                                    {app.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="flex items-center gap-1">
                                                <Calendar size={14} className="text-gray-500" />
                                                {formatDate(app.applied_at)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={14} className="text-gray-500" />
                                                    {app.location || "Remote"}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {app.resume_path ? (
                                                        <a
                                                            href={`/storage/${app.resume_path}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 whitespace-nowrap"
                                                            title="View Resume"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <FileText size={16} />
                                                            <span className="sr-only md:not-sr-only">Resume</span>
                                                        </a>
                                                    ) : null}
                                                    {app.cover_letter ? (
                                                        <span
                                                            className="inline-flex items-center gap-1 text-blue-600 whitespace-nowrap"
                                                            title="Has Cover Letter"
                                                        >
                                                            <FileCheck size={16} />
                                                            <span className="sr-only md:not-sr-only">Cover Letter</span>
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 justify-start">
                                                    <Link
                                                        href={route('applications.show', app.id)}
                                                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 whitespace-nowrap"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <Eye size={16} />
                                                        <span className="sr-only md:not-sr-only">View</span>
                                                    </Link>
                                                    <Link
                                                        href={route('applications.edit', app.id)}
                                                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 whitespace-nowrap"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <Edit size={16} />
                                                        <span className="sr-only md:not-sr-only">Edit</span>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-500">
                        Showing {filteredApplications.length} of {applications.length} applications
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

JobApplicationsIndex.layout = (page) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default JobApplicationsIndex;
