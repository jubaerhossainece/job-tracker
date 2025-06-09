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
    public function update(Request $request)
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

        return redirect()->back()->with('success', 'Account information updated successfully.');
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

        return redirect()->back()->with('success', 'Profile photo updated successfully.');
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

        return redirect()->back()->with('success', 'Profile photo removed successfully.');
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

        return redirect()->back()->with('success', 'Social links updated successfully.');
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

        return redirect()->back()->with('success', 'Professional information updated successfully.');
    }

    /**
     * Update resume.
     */
    public function updateResume(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'resume' => 'required|file|mimes:pdf,doc,docx|max:5120', // 5MB max
        ]);

        // Delete old resume if exists
        if ($user->resume) {
            Storage::disk('public')->delete($user->resume);
        }

        // Store new resume
        $path = $request->file('resume')->store('resumes', 'public');
        
        $user->update(['resume' => $path]);

        return redirect()->back()->with('success', 'Resume updated successfully.');
    }

    /**
     * Remove resume.
     */
    public function removeResume()
    {
        $user = Auth::user();
        
        if ($user->resume) {
            Storage::disk('public')->delete($user->resume);
            $user->update(['resume' => null]);
        }

        return redirect()->back()->with('success', 'Resume removed successfully.');
    }

    /**
     * Delete user account.
     */
    public function delete(Request $request)
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
