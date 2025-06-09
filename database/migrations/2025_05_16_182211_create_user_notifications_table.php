<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('email_job_alerts')->default(true);
            $table->boolean('email_application_updates')->default(true);
            $table->boolean('email_interview_reminders')->default(true);
            $table->boolean('email_weekly_summary')->default(true);
            $table->boolean('email_marketing')->default(false);
            $table->boolean('push_job_alerts')->default(true);
            $table->boolean('push_application_updates')->default(true);
            $table->boolean('push_interview_reminders')->default(true);
            $table->boolean('sms_interview_reminders')->default(false);
            $table->boolean('sms_urgent_updates')->default(false);
            $table->timestamps();
            
            $table->unique('user_id');
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_notifications');
    }
};
