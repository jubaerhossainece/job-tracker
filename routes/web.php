<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\JobEventController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserSettingsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


    Route::get('/applications', [JobApplicationController::class, 'index'])->name('applications.index');
    Route::get('/applications/create', [JobApplicationController::class, 'create'])->name('applications.create');
    Route::post('/applications', [JobApplicationController::class, 'store'])->name('applications.store');
    Route::get('/applications/{jobApplication}', [JobApplicationController::class, 'show'])->name('applications.show');
    Route::get('/applications/{jobApplication}/edit', [JobApplicationController::class, 'edit'])->name('applications.edit');
    Route::put('/applications/{jobApplication}', [JobApplicationController::class, 'update'])->name('applications.update');
    Route::delete('/applications/{jobApplication}', [JobApplicationController::class, 'destroy'])->name('applications.destroy');
    Route::get('/applications/{application}/resume/download', [JobApplicationController::class, 'downloadResume'])
        ->name('applications.resume.download');

    // Job Events
    Route::resource('applications.events', JobEventController::class)->shallow();

    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::put('/settings/account', [App\Http\Controllers\Settings\AccountController::class, 'update'])->name('settings.account.update');
    Route::post('/settings/photo', [App\Http\Controllers\Settings\AccountController::class, 'updatePhoto'])->name('settings.photo.update');
    Route::delete('/settings/photo', [App\Http\Controllers\Settings\AccountController::class, 'removePhoto'])->name('settings.photo.remove');
    Route::put('/settings/social', [App\Http\Controllers\Settings\AccountController::class, 'updateSocial'])->name('settings.social.update');
    Route::put('/settings/professional', [App\Http\Controllers\Settings\AccountController::class, 'updateProfessional'])->name('settings.professional.update');
    Route::post('/settings/resume', [App\Http\Controllers\Settings\AccountController::class, 'updateResume'])->name('settings.resume.update');
    Route::delete('/settings/resume', [App\Http\Controllers\Settings\AccountController::class, 'removeResume'])->name('settings.resume.remove');
    Route::put('/settings/password', [SettingController::class, 'updatePassword'])->name('settings.password.update');
    Route::delete('/settings/account', [SettingController::class, 'deleteAccount'])->name('settings.account.delete');
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/settings', [SettingController::class, 'index']);

    // routes/web.php
    Route::put('/settings/notification', [UserSettingsController::class, 'updateNotification'])->name('settings.notification.update');
    Route::put('/settings/privacy', [UserSettingsController::class, 'updatePrivacy'])->name('settings.privacy.update');
});


require __DIR__ . '/auth.php';
