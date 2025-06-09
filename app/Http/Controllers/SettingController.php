<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display the settings page.
     */
    public function index()
    {
        $user = Auth::user();

        // return Inertia::render('Settings', ['user'=> $user]);

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
            ]
        ]);
    }

    /**
     * Update password.
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|current_password',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = Auth::user();
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Password updated successfully.');
    }

    /**
     * Delete user account.
     */
    public function deleteAccount(Request $request)
    {
        $request->validate([
            'password' => 'required|current_password',
        ]);

        $user = Auth::user();

        // Delete user files
        if ($user->photo) {
            Storage::disk('public')->delete($user->photo);
        }
        if ($user->resume) {
            Storage::disk('public')->delete($user->resume);
        }

        // Delete user and logout
        $user->delete();
        Auth::logout();

        return redirect('/')->with('success', 'Account deleted successfully.');
    }
}
