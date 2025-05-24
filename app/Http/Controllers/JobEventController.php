<?php

namespace App\Http\Controllers;

use App\Http\Requests\Events\StoreJobEventRequest;
use App\Models\JobApplication;
use App\Models\JobEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobEventController extends Controller
{
    /**
     * Show the form for creating a new event.
     */
    public function create(JobApplication $application)
    {
        return Inertia::render('JobApplications/Events/Create', [
            'application' => $application
        ]);
    }

    /**
     * Store a newly created event in storage.
     */
    public function store(StoreJobEventRequest $request, JobApplication $application)
    {
        $validated = $request->validated();

        // Create the event
        $event = $application->events()->create($validated);

        // Update application status based on event type (optional)
        $this->updateApplicationStatus($application, $validated['event_type']);

        return redirect()->route('applications.show', $application->id)
            ->with('success', 'Event added successfully.');
    }

    /**
     * Update the application status based on event type.
     */
    private function updateApplicationStatus(JobApplication $application, string $eventType)
    {
        // Map event types to application statuses
        $statusMap = [
            'phone_screen' => 'interview',
            'technical_interview' => 'interview',
            'behavioral_interview' => 'interview',
            'onsite_interview' => 'interview',
            'offer_received' => 'offer',
            'offer_accepted' => 'offer',
            'offer_declined' => 'rejected',
            'rejection' => 'rejected',
        ];

        // Update application status if the event type maps to a status
        if (isset($statusMap[$eventType])) {
            $application->update(['status' => $statusMap[$eventType]]);
        }
    }

    /**
     * Show the form for editing the specified event.
     */
    public function edit(JobEvent $event)
    {
        return Inertia::render('JobApplications/Events/Edit', [
            'jobEvent' => $event,
            'jobApplication' => $event->jobApplication
        ]);
    }

    /**
     * Update the specified event in storage.
     */
    public function update(Request $request, JobEvent $event)
    {
        $validated = $request->validate([
            'event_type' => 'required|string',
            'title' => 'required|string|max:255',
            'event_date' => 'required|date',
            'event_time' => 'nullable|date_format:H:i',
            'notes' => 'nullable|string',
            'interviewer_name' => 'nullable|string|max:255',
            'interviewer_email' => 'nullable|email|max:255',
            'location' => 'nullable|string|max:255',
            'meeting_link' => 'nullable|url|max:255',
        ]);

        $event->update($validated);

        // Update application status based on event type (optional)
        $this->updateApplicationStatus($event->jobApplication, $validated['event_type']);

        return redirect()->route('applications.show', $event->jobApplication->id)
            ->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified event from storage.
     */
    public function destroy(JobEvent $event)
    {
        $applicationId = $event->job_application_id;
        $event->delete();

        return redirect()->route('applications.show', $applicationId)
            ->with('success', 'Event deleted successfully.');
    }
}
