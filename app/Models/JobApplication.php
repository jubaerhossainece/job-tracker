<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'position_title',
        'status',
        'applied_at',
        'job_url',
        'location',
        'notes',
        'resume_path',
        'cover_letter',
    ];
    
}
