<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobApplication\StoreApplicationRequest;
use App\Http\Requests\JobApplication\UpdateApplicationRequest;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{

    public function create()
    {
        return Inertia::render('JobApplications/Create');
    }


    public function index()
    {
        $query = JobApplication::where('user_id', auth()->id());

        $jobApplications = $query->latest()->paginate(9);

        $statsQuery = JobApplication::where('user_id', auth()->id());

        $stats = [
            'total' => $statsQuery->count(),
            'interview' => $statsQuery->where('status', 'interview')->count(),
            'offer' => $statsQuery->where('status', 'offer')->count(),
            'rejected' => $statsQuery->where('status', 'rejected')->count(),
        ];

        return Inertia::render('JobApplications/Index', [
            'jobApplications' => $jobApplications,
            'stats' => $stats,
        ]);
    }

    public function store(StoreApplicationRequest $request)
    {
        $validated = $request->validated();

        // Add user_id to the validated data
        $validated['user_id'] = auth()->id();

        if ($request->hasFile('resume_file')) {
            $validated['resume_path'] = $request->file('resume_file')->store('resumes', 'public');
        }

        JobApplication::create($validated);
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
