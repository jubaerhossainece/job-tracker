<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with(['preferences', 'securitySettings'])
            ->latest()
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'created_at' => $user->created_at->format('M d, Y'),
                    'updated_at' => $user->updated_at->format('M d, Y'),
                    'status' => $user->email_verified_at ? 'active' : 'pending',
                    'preferences' => $user->preferences,
                    'security_settings' => $user->securitySettings,
                ];
            });

        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    public function profile()
    {
        $user = auth()->user()->load(['preferences', 'securitySettings']);
        
        return Inertia::render('Profile/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at->format('M d, Y'),
                'email_verified_at' => $user->email_verified_at ? $user->email_verified_at->format('M d, Y') : null,
                'preferences' => $user->preferences,
                'security_settings' => $user->securitySettings,
            ]
        ]);
    }
}
