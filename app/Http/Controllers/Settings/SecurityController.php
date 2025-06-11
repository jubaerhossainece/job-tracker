<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\LoginHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class SecurityController extends Controller
{
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

        if(Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages(
                ['password' => 'The new password must be different from the current password.']
            );
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Password updated successfully.');
    }

    /**
     * Delete user account.
     */
    public function destroy(Request $request)
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


    /**
     * Get login history for the authenticated user.
     */
    public function getLoginHistory(Request $request)
    {
        $user = Auth::user();
        $limit = $request->query('limit', 10); // Default to 10, allow frontend to request more/less

        $loginHistories = LoginHistory::where('user_id', $user->id)
            ->orderBy('login_at', 'desc')
            ->take($limit)
            ->get();

        // For an API endpoint, you'd return JSON.
        // However, this method will be called by another controller method 
        // (`SettingController@index`) to pass data as a prop to an Inertia view.
        // So, just returning the collection is fine here.
        // If this were a direct Inertia visit endpoint, it would return Inertia::render.
        // If it were a pure XHR API, it would return response()->json(...).
        // For now, let's assume it's called internally by another controller or a page route.
        return $loginHistories;
    }
}
