<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\LoginHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;
use Jenssegers\Agent\Agent;

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

        if (Hash::check($request->password, $user->password)) {
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
            ->get()->map(function ($item) {
                $item->login_at_human = Carbon::parse($item->login_at)->diffForHumans();
                return $item;
            });

        // For an API endpoint, you'd return JSON.
        // However, this method will be called by another controller method 
        // (`SettingController@index`) to pass data as a prop to an Inertia view.
        // So, just returning the collection is fine here.
        // If this were a direct Inertia visit endpoint, it would return Inertia::render.
        // If it were a pure XHR API, it would return response()->json(...).
        // For now, let's assume it's called internally by another controller or a page route.
        return $loginHistories;
    }



    /**
     * Get active sessions for the authenticated user.
     */
    public function getActiveSessions(Request $request)
    {
        if (config('session.driver') !== 'database') {
            return collect(); 
        }

        $userId = Auth::id();
        $currentSessionId = $request->session()->getId(); 
        $agentParser = new Agent();

        $sessions = DB::table(config('session.table', 'sessions'))
            ->where('user_id', $userId)
            ->orderBy('last_activity', 'desc')
            ->get();

        return $sessions->map(function ($session) use ($agentParser, $currentSessionId) {
            $agentParser->setUserAgent($session->user_agent); 

            return (object) [
                'id' => $session->id,
                'ip_address' => $session->ip_address,
                'device_info' => $agentParser->browser() . ' on ' . $agentParser->platform(),
                'browser' => $agentParser->browser(),
                'platform' => $agentParser->platform(),
                'is_current_session' => $session->id === $currentSessionId,
                'last_activity' => Carbon::createFromTimestamp($session->last_activity)->diffForHumans(),
                'last_activity_raw' => $session->last_activity, 
                'user_agent_raw' => $session->user_agent, 
            ];
        });
    }

    /**
     * Log out from other browser sessions.
     */
    public function logoutOtherSessions(Request $request)
    {
        $request->validateWithBag('logoutOtherSessions', [ 
            'password' => ['required', 'current_password'],
        ]);

        if (Auth::logoutOtherDevices($request->password)) {
            // This typically triggers a new session ID for the current device as well,
            // so the frontend might need to be aware or re-fetch session data if it was displaying it.
            // For now, just returning success.
            return back()->with('success', 'Successfully logged out from other browser sessions.');
        }

        // This part might not be reached if current_password validation fails (throws ValidationException)
        // or if logoutOtherDevices itself throws an exception on some internal failure.
        // However, if logoutOtherDevices could return false without an exception:
        return back()->withErrors(['password' => __('Could not log out from other browser sessions.')], 'logoutOtherSessions');
    }
}
