<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoginHistory extends Model
{
      use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'location',
        'ip_address',
        'user_agent',
        'login_at',
        'login_successful',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'login_at' => 'datetime',
        'login_successful' => 'boolean',
    ];

    /**
     * Get the user that owns the login history record.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
