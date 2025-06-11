<?php

namespace App\Listeners;

use App\Models\LoginHistory;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Failed;
use Carbon\Carbon; // For login_at

class LogAuthenticationAttempt
{
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Handle user login events.
     */
    public function handleUserLogin(Login $event): void
    {
        LoginHistory::create([
            'user_id' => $event->user->id,
            'ip_address' => $this->request->ip(),
            'user_agent' => $this->request->userAgent(),
            'login_at' => Carbon::now(),
            'login_successful' => true,
        ]);
    }

    /**
     * Handle user failed login events.
     */
    public function handleUserLoginAttemptFailed(Failed $event): void
    {
        // $event->user might be null if the user was not found by credentials.
        // $event->credentials['email'] (or other identifier) could be logged.
        // For simplicity, we'll log user_id if available.
        LoginHistory::create([
            'user_id' => $event->user->id ?? null, 
            // Consider logging $event->credentials['email'] in a separate field 
            // if you want to track failed attempts by non-existent users.
            'ip_address' => $this->request->ip(),
            'user_agent' => $this->request->userAgent(),
            'login_at' => Carbon::now(),
            'login_successful' => false,
        ]);
    }

    /**
     * Register the listeners for the subscriber.
     *
     * @param  \Illuminate\Events\Dispatcher  $events
     * @return void
     */
    public function subscribe($events): void
    {
        $events->listen(
            Login::class,
            [LogAuthenticationAttempt::class, 'handleUserLogin']
        );

        $events->listen(
            Failed::class,
            [LogAuthenticationAttempt::class, 'handleUserLoginAttemptFailed']
        );
    }
}
