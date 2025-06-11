<?php

namespace App\Listeners;

use App\Models\LoginHistory;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Failed;
use Carbon\Carbon; // For login_at
use Jenssegers\Agent\Agent;
use Stevebauman\Location\Facades\Location;

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
        $ip = $this->request->ip(); // or use a fixed IP for testing
        $locationData = Location::get($ip);

        $agent = new Agent();
        $browser = $agent->browser();      // "Chrome"
        $platform = $agent->platform();    // "Windows"
        $version = $agent->version($browser); // "114.0.0.0"
        $deviceInfo = $browser . ' on ' . $platform;

        LoginHistory::create([
            'user_id' => $event->user->id,
            'location' => $locationData
                ? $locationData->city . ', ' . $locationData->regionName
                : 'Unknown',
            'ip_address' => $this->request->ip(),
            'user_agent' => $deviceInfo,
            'login_at' => Carbon::now(),
            'login_successful' => true,
        ]);
    }

    /**
     * Handle user failed login events.
     */
    public function handleUserLoginAttemptFailed(Failed $event): void
    {
        $ip = $this->request->ip(); // or use a fixed IP for testing
        $locationData = Location::get($ip);
        // $event->user might be null if the user was not found by credentials.
        // $event->credentials['email'] (or other identifier) could be logged.
        // For simplicity, we'll log user_id if available.

        $agent = new Agent();
        $browser = $agent->browser();      // "Chrome"
        $platform = $agent->platform();    // "Windows"
        $version = $agent->version($browser); // "114.0.0.0"
        $deviceInfo = $browser . ' on ' . $platform;

        LoginHistory::create([
            'user_id' => $event->user->id ?? null,
            // Consider logging $event->credentials['email'] in a separate field 
            // if you want to track failed attempts by non-existent users.
            'location' => $locationData
                ? $locationData->city . ', ' . $locationData->regionName
                : 'Unknown',
            'ip_address' => $this->request->ip(),
            'user_agent' => $deviceInfo,
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
