<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use App\Models\JobEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = Auth::user();
        
        // Get recent applications (last 6)
        $recentApplications = JobApplication::where('user_id', $user->id)
            ->orderBy('applied_at', 'desc')
            ->limit(6)
            ->get()
            ->map(function ($application) {
                return [
                    'id' => $application->id,
                    'company_name' => $application->company_name,
                    'position_title' => $application->position_title,
                    'location' => $application->location,
                    'status' => $application->status,
                    'applied_at' => $application->applied_at->format('Y-m-d'),
                    'job_url' => $application->job_url,
                    'resume_path' => $application->resume_path ? true : false,
                    'cover_letter' => $application->cover_letter ? true : false,
                ];
            });
        
        // Calculate statistics
        $stats = [
            'total' => JobApplication::where('user_id', $user->id)->count(),
            'applied' => JobApplication::where('user_id', $user->id)->where('status', 'applied')->count(),
            'interview' => JobApplication::where('user_id', $user->id)->where('status', 'interview')->count(),
            'offer' => JobApplication::where('user_id', $user->id)->where('status', 'offer')->count(),
            'rejected' => JobApplication::where('user_id', $user->id)->where('status', 'rejected')->count(),
        ];
        
        // Calculate monthly application counts for the chart (last 6 months)
        $monthlyApplications = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $count = JobApplication::where('user_id', $user->id)
                ->whereYear('applied_at', $month->year)
                ->whereMonth('applied_at', $month->month)
                ->count();
                
            $monthlyApplications[] = [
                'month' => $month->format('M Y'),
                'count' => $count,
            ];
        }
        
        // Get upcoming interviews (next 5)
        $upcomingInterviews = JobEvent::whereHas('jobApplication', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->where('event_date', '>=', Carbon::today())
            ->whereIn('event_type', ['phone_screen', 'technical_interview', 'behavioral_interview', 'onsite_interview'])
            ->with('jobApplication')
            ->orderBy('event_date', 'asc')
            ->orderBy('event_time', 'asc')
            ->limit(5)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'job_application_id' => $event->job_application_id,
                    'company_name' => $event->jobApplication->company_name,
                    'position_title' => $event->jobApplication->position_title,
                    'event_type' => $event->title,
                    'event_date' => $event->event_date->format('Y-m-d'),
                    'event_time' => $event->event_time,
                    'interviewer_name' => $event->interviewer_name,
                ];
            });
        
        return Inertia::render('Dashboard', [
            'recentApplications' => $recentApplications,
            'stats' => $stats,
            'monthlyApplications' => $monthlyApplications,
            'upcomingInterviews' => $upcomingInterviews,
        ]);
    }
}
