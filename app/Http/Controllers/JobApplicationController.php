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

    public function store(Request $request)
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
            'cover_letter' => 'nullable|string', // now a text field
        ]);

        if ($request->hasFile('resume')) {
            $validated['resume_path'] = $request->file('resume')->store('resumes');
        }

        $job = JobApplication::create($validated);

        return response()->json($job, 201);
    }
}
