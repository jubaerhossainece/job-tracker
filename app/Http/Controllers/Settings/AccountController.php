<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Update account information.
     */
    public function updateAccount(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20|unique:users,phone,' . $user->id,
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'job_title' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:1000',
        ]);

        $user->update($validated);

        return back()->with('success', 'Account information updated successfully.');
    }

    /**
     * Update profile photo.
     */
    public function updatePhoto(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Delete old photo if exists
        if ($user->photo) {
            Storage::disk('public')->delete($user->photo);
        }

        // Store new photo
        $path = $request->file('photo')->store('profile-photos', 'public');

        $user->update(['photo' => $path]);

        return back()->with('success', 'Profile photo updated successfully.');
    }

    /**
     * Remove profile photo.
     */
    public function removePhoto()
    {
        $user = Auth::user();

        if ($user->photo) {
            Storage::disk('public')->delete($user->photo);
            $user->update(['photo' => null]);
        }

        return back()->with('success', 'Profile photo removed successfully.');
    }

    /**
     * Update social links.
     */
    public function updateSocial(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'website' => 'nullable|url|max:255',
            'linkedin' => 'nullable|url|max:255',
            'github' => 'nullable|url|max:255',
            'twitter' => 'nullable|url|max:255',
        ]);

        $user->update($validated);

        return back()->with('success', 'Social links updated successfully.');
    }

    /**
     * Update professional information.
     */
    public function updateProfessional(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'skills' => 'nullable|string|max:1000',
            'languages' => 'nullable|string|max:500',
            'portfolio' => 'nullable|url|max:255',
        ]);

        $user->update($validated);

        return back()->with('success', 'Professional information updated successfully.');
    }

    /**
     * Update resume.
     */
    public function updateResume(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'resume' => 'required|file|mimes:pdf,doc,docx|max:5120',
        ]);

        // Ensure there's a file and it's valid before proceeding
        if ($request->hasFile('resume') && $request->file('resume')->isValid()) {
            // Delete old resume only if it exists and is not '0'
            if (!empty($user->resume) && $user->resume !== '0') {
                Storage::disk('public')->delete($user->resume);
            }

            // Store new resume
            $newPath = $request->file('resume')->store('resumes', 'public');

            if ($newPath) { // Check if storing was successful and returned a path
                $user->update([
                    'resume' => $newPath,
                    'resume_uploaded_at' => now(),
                ]);
            } else {
                // Log an error or return a specific error message if path is not generated
                return back()->with('error', 'Could not store resume file.');
            }
        } else {
            return back()->with('error', 'Invalid resume file provided.');
        }

        return back()->with('success', 'Resume updated successfully.');
    }

    /**
     * Remove resume.
     */
    public function removeResume()
    {
        $user = Auth::user();

        if ($user->resume) {
            Storage::disk('public')->delete($user->resume);
            $user->update([
                'resume' => null,
                'resume_uploaded_at' => null,
            ]);
        }

        return back()->with('success', 'Resume removed successfully.');
    }
}
