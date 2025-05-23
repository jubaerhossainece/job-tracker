<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobApplication\StoreApplicationRequest;
use App\Http\Requests\JobApplication\UpdateApplicationRequest;
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

    public function store(StoreApplicationRequest $request)
    {
        $validated = $request->validated();

        // Make a copy of the validated array
        $data = $validated;
        $validated['user_id'] = auth()->id();
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
    
    public function update(UpdateApplicationRequest $request, JobApplication $jobApplication)
    {
        $validated = $request->validated();
        
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
