<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobEvent extends Model
{
    use HasFactory;

    protected $eventTypes = [
        'application_submitted' => 'Application Submitted',
        'application_viewed' => 'Application Viewed',
        'phone_screen' => 'Phone Screen',
        'technical_interview' => 'Technical Interview',
        'behavioral_interview' => 'Behavioral Interview',
        'take_home_assignment' => 'Take-home Assignment',
        'onsite_interview' => 'Onsite Interview',
        'reference_check' => 'Reference Check',
        'offer_received' => 'Offer Received',
        'offer_accepted' => 'Offer Accepted',
        'offer_declined' => 'Offer Declined',
        'rejection' => 'Rejection',
        'follow_up' => 'Follow Up',
        'other' => 'Other',
    ];



     protected $fillable = [
        'job_application_id',
        'event_type',
        'title',
        'event_date',
        'event_time',
        'notes',
        'interviewer_name',
        'interviewer_email',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'event_date' => 'date',
    ];

    /**
     * Get the job application that owns the event.
     */
    public function jobApplication()
    {
        return $this->belongsTo(JobApplication::class);
    }
}
