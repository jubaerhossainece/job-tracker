<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    public function index()
    {
        $applications = JobApplication::latest()->get();

        return Inertia::render('JobApplications/Index', [
            'applications' => $applications,
        ]);
    }
    
    public function create()
    {
        return Inertia::render('JobApplications/Create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'company_name' => 'required|string',
                'position_title' => 'required|string',
                'status' => 'required|in:applied,interview,offer,rejected',
                'applied_at' => 'required|date',
                'job_url' => 'nullable|url',
                'location' => 'required|string',
                'notes' => 'nullable|string',
                'resume' => 'nullable|file|mimes:pdf,doc,docx',
                'cover_letter' => 'nullable|string',
            ]);
    
            // Make a copy of the validated array
            $data = $validated;
            
            // Ensure applied_at is properly formatted
            if (isset($data['applied_at'])) {
                $data['applied_at'] = date('Y-m-d', strtotime($data['applied_at']));
            }
            
            // Handle file storage separately
            if ($request->hasFile('resume')) {
                $resume = $request->file('resume');
                $data['resume_path'] = $resume->store('resumes', 'public');
            }
            
            // Remove resume from data array as it's not a database field
            if (isset($data['resume'])) {
                unset($data['resume']);
            }
    
            $job = JobApplication::create($data);
    
            return redirect()->route('applications.index')
                ->with('success', 'Job application created successfully!');
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Job application creation error: ' . $e->getMessage());
            
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'There was a problem creating your job application. Please try again.']);
        }
    }
    
    public function show(JobApplication $jobApplication)
    {
        return Inertia::render('JobApplications/Show', [
            'application' => $jobApplication
        ]);
    }
    
    public function edit(JobApplication $jobApplication)
    {
        return Inertia::render('JobApplications/Edit', [
            'application' => $jobApplication
        ]);
    }
    
    public function update(Request $request, JobApplication $jobApplication)
    {
        $validated = $request->validate([
            'company_name' => 'required|string',
            'position_title' => 'required|string',
            'status' => 'required|in:applied,interview,offer,rejected',
            'applied_at' => 'required|date',
            'job_url' => 'nullable|url',
            'location' => 'required|string',
            'notes' => 'nullable|string',
            'resume' => 'nullable|file|mimes:pdf,doc,docx',
            'cover_letter' => 'nullable|string',
        ]);
        
        // Make a copy of the validated array
        $data = $validated;
        
        // Handle resume upload if a new one is provided
        if ($request->hasFile('resume')) {
            $resume = $request->file('resume');
            $data['resume_path'] = $resume->store('resumes', 'public');
        }
        
        // Remove resume from data array as it's not a database field
        if (isset($data['resume'])) {
            unset($data['resume']);
        }
        
        $jobApplication->update($data);
        
        return redirect()->route('applications.index')
            ->with('success', 'Job application updated successfully!');
    }
    
    public function destroy(JobApplication $jobApplication)
    {
        $jobApplication->delete();
        
        return redirect()->route('applications.index')
            ->with('success', 'Job application deleted successfully!');
    }
}
