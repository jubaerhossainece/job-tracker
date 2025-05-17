// resources/js/Pages/Applications/Index.jsx

import React from "react";
import { usePage } from "@inertiajs/react";
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

const JobApplicationsIndex = () => {
    const { applications } = usePage().props;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">All Job Applications</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applied At</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Cover Letter</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.map((app) => (
                        <TableRow key={app.id}>
                            <TableCell>{app.company_name}</TableCell>
                            <TableCell>{app.position_title}</TableCell>
                            <TableCell>{app.status}</TableCell>
                            <TableCell>
                                {new Date(app.applied_at).toLocaleString()}
                            </TableCell>
                            <TableCell>{app.location}</TableCell>
                            <TableCell>
                                {app.resume_path ? (
                                    <a
                                        href={`/storage/${app.resume_path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        View
                                    </a>
                                ) : (
                                    "—"
                                )}
                            </TableCell>
                            <TableCell>
                                {app.cover_letter_path ? (
                                    <details>
                                        <summary className="text-blue-600 cursor-pointer">
                                            View
                                        </summary>
                                        <pre className="whitespace-pre-wrap max-w-xs">
                                            {app.cover_letter_path}
                                        </pre>
                                    </details>
                                ) : (
                                    "—"
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

JobApplicationsIndex.layout = (page) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default JobApplicationsIndex;
