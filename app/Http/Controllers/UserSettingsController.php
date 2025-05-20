<?php

namespace App\Http\Controllers;

use App\Http\Requests\Settings\UpdateNotificationRequest;
use App\Http\Requests\Settings\UpdatePreferencesRequest;
use App\Http\Requests\Settings\UpdatePrivacyRequest;
use Illuminate\Http\Request;

class UserSettingsController extends Controller
{
    public function updatePreferences(UpdatePreferencesRequest $request)
    {
        $request->validated();

        $request->user()->preferences()->updateOrCreate([], $request->only([
            'theme',
            'language',
            'currency',
            'date_format',
            'font_size',
            'dashboard_layout',
        ]));

        return response()->json(['message' => 'Preferences updated.']);
    }


    public function updateNotification(UpdateNotificationRequest $request)
    {
        $validated = $request->validated();

        $user = $request->user();

        $user->notificationSettings()->updateOrCreate(
            [], // assumes 1-to-1 relationship
            $validated
        );

        return redirect()->back()->with('success', 'Notification settings updated.');
    }


    public function updatePrivacy(UpdatePrivacyRequest $request)
    {
        $validated = $request->validated();

        $user = $request->user();

        $user->privacySettings()->updateOrCreate([], $validated);

        return redirect()->back()->with('success', 'Privacy settings updated.');
    }
}
