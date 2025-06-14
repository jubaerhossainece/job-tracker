<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display the settings page.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        // return Inertia::render('Settings', ['user'=> $user]);
        $securityController = app(SecurityController::class);
        $loginHistory = $securityController->getLoginHistory($request);
        $activeSessions = $securityController->getActiveSessions($request);

        return Inertia::render('Settings/Index', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'photo' => $user->photo,
                'address' => $user->address,
                'city' => $user->city,
                'state' => $user->state,
                'country' => $user->country,
                'postal_code' => $user->postal_code,
                'job_title' => $user->job_title,
                'company' => $user->company,
                'website' => $user->website,
                'linkedin' => $user->linkedin,
                'github' => $user->github,
                'twitter' => $user->twitter,
                'bio' => $user->bio,
                'skills' => $user->skills,
                'languages' => $user->languages,
                'resume' => $user->resume,
                'portfolio' => $user->portfolio,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'resume_uploaded_at' => $user->resume_uploaded_at,
            ],
            'loginHistory' => $loginHistory,
            'activeSessions'=> $activeSessions,
        ]);
    }
}
