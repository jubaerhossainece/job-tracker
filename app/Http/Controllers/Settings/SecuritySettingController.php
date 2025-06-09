<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
    use App\Models\LoginHistory;
use Inertia\Inertia;
use Jenssegers\Agent\Agent;

class SecuritySettingController extends Controller
{

public function historyAndSessions()
{
    $userId = auth()->id();

    $histories = LoginHistory::where('user_id', $userId)
        ->orderByDesc('login_at')
        ->take(10)
        ->get()
        ->map(function ($item) {
            return [
                'date' => $item->login_at->format('Y-m-d'),
                'time' => $item->login_at->format('H:i T'),
                'ip' => $item->ip_address,
                'location' => $item->location ?? 'Unknown',
            ];
        });

    $agent = new Agent();
    $sessions = LoginHistory::where('user_id', $userId)
        ->where('status', 'active')
        ->get()
        ->map(function ($item) use ($agent) {
            $agent->setUserAgent($item->user_agent);

            return [
                'device' => $agent->device() ?? 'Laptop',
                'browser' => $agent->browser(),
                'os' => $agent->platform(),
            ];
        });

    return Inertia::render('Settings', [
        'settings' => [
            'security' => [
                'twoFactorEnabled' => false, // Your logic here
                'loginHistory' => $histories,
                'activeSessions' => $sessions,
            ]
        ]
    ]);
}

}
