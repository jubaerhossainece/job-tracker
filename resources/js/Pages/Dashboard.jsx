"use client"
import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from "react"
import { useForm, Link } from "@inertiajs/react";
import { PlusCircle, Search, Calendar, TrendingUp, Users, Clock, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import JobCard from "@/components/JobCard"
import Pagination from "@/components/Pagination"
import { CustomButton } from '@/components/ui/custom-button';




// "use client"

// import { Link } from "@inertiajs/react"
// import { PlusCircle, Search, Calendar, TrendingUp, Users, Clock } from "lucide-react"
// import { Button } from "@/Components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
// import JobCard from "@/Components/JobCard"
// import DashboardLayout from "@/Layouts/DashboardLayout"
// import { route } from "@/Helpers/route"

const Dashboard = ({ recentApplications, stats, monthlyApplications, upcomingInterviews }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your job search overview.</p>
        </div>
        <Link href={route("applications.create")}>
          <CustomButton size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Job
          </CustomButton>
        </Link>
      </div>

      {/* Statistics Cards with Colors */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {/* Total Applications - Blue Theme */}
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Applications</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-full">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400">Jobs you've applied to</p>
          </CardContent>
        </Card>

        {/* Interviews - Amber/Orange Theme */}
        <Card className="border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/50 dark:to-amber-900/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">Interviews</CardTitle>
            <div className="p-2 bg-amber-500/10 rounded-full">
              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">{stats.interview}</div>
            <p className="text-xs text-amber-600 dark:text-amber-400">
              {stats.total > 0 ? ((stats.interview / stats.total) * 100).toFixed(1) : 0}% of applications
            </p>
          </CardContent>
        </Card>

        {/* Offers - Green Theme */}
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Offers</CardTitle>
            <div className="p-2 bg-green-500/10 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.offer}</div>
            <p className="text-xs text-green-600 dark:text-green-400">
              {stats.total > 0 ? ((stats.offer / stats.total) * 100).toFixed(1) : 0}% of applications
            </p>
          </CardContent>
        </Card>

        {/* Rejections - Red Theme */}
        <Card className="border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">Rejections</CardTitle>
            <div className="p-2 bg-red-500/10 rounded-full">
              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900 dark:text-red-100">{stats.rejected}</div>
            <p className="text-xs text-red-600 dark:text-red-400">
              {stats.total > 0 ? ((stats.rejected / stats.total) * 100).toFixed(1) : 0}% of applications
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <Card className="border-t-4 border-t-slate-500">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/30">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-700 dark:text-slate-300">Recent Applications</CardTitle>
                <Link href={route("applications.index")}>
                  <Button variant="outline" size="sm" className="border-slate-300 text-slate-600 hover:bg-slate-100">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {recentApplications && recentApplications.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {recentApplications.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 p-8 text-center bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <Search className="h-10 w-10 text-slate-500" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-700 dark:text-slate-300">No applications yet</h3>
                  <p className="mt-2 text-sm text-slate-500">Start by adding your first job application.</p>
                  <Link href={route("applications.create")} className="mt-4">
                    <Button size="sm" className="bg-slate-600 hover:bg-slate-700">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Job Application
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Interviews */}
        <div>
          <Card className="border-t-4 border-t-purple-500 bg-gradient-to-br from-purple-50 to-purple-100/30 dark:from-purple-950/30 dark:to-purple-900/20">
            <CardHeader className="bg-gradient-to-r from-purple-100/50 to-purple-200/30 dark:from-purple-900/30 dark:to-purple-800/20">
              <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                <div className="p-1 bg-purple-500/10 rounded-full">
                  <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                Upcoming Interviews
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {upcomingInterviews && upcomingInterviews.length > 0 ? (
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="flex flex-col space-y-1 border-l-2 border-purple-400 pl-4 bg-white/50 dark:bg-purple-950/20 p-3 rounded-r-lg"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                          {interview.event_type}
                        </p>
                        <p className="text-xs text-purple-600 dark:text-purple-400">
                          {new Date(interview.event_date).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                        {interview.company_name}
                      </p>
                      <p className="text-xs text-purple-600 dark:text-purple-400">{interview.position_title}</p>
                      {interview.event_time && (
                        <p className="text-xs text-purple-500 dark:text-purple-400">Time: {interview.event_time}</p>
                      )}
                      {interview.interviewer_name && (
                        <p className="text-xs text-purple-500 dark:text-purple-400">
                          Interviewer: {interview.interviewer_name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full w-fit mx-auto mb-2">
                    <Calendar className="h-12 w-12 text-purple-500" />
                  </div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">No upcoming interviews</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Trends Chart with Colors */}
      {monthlyApplications && monthlyApplications.length > 0 && (
        <div className="mt-6">
          <Card className="border-t-4 border-t-indigo-500 bg-gradient-to-br from-indigo-50 to-indigo-100/30 dark:from-indigo-950/30 dark:to-indigo-900/20">
            <CardHeader className="bg-gradient-to-r from-indigo-100/50 to-indigo-200/30 dark:from-indigo-900/30 dark:to-indigo-800/20">
              <CardTitle className="text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                <div className="p-1 bg-indigo-500/10 rounded-full">
                  <TrendingUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                Application Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-end space-x-2 h-32 bg-white/50 dark:bg-indigo-950/20 p-4 rounded-lg">
                {monthlyApplications.map((month, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t w-full min-h-[4px] shadow-sm"
                      style={{
                        height: `${Math.max((month.count / Math.max(...monthlyApplications.map((m) => m.count))) * 100, 4)}%`,
                      }}
                    />
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 text-center">{month.month}</p>
                    <p className="text-xs font-medium text-indigo-800 dark:text-indigo-200">{month.count}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}


Dashboard.layout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Dashboard
