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
        Schema::create('application_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_application_id')->constrained()->onDelete('cascade');
            $table->enum('event_type', [
                'application_submitted',
                'application_viewed',
                'phone_screen',
                'technical_interview',
                'behavioral_interview',
                'take_home_assignment',
                'onsite_interview',
                'reference_check',
                'offer_received',
                'offer_accepted',
                'offer_declined',
                'rejection',
                'follow_up'
            ]);
            $table->string('title');
            $table->date('event_date');
            $table->time('event_time')->nullable();
            $table->text('notes')->nullable();
            $table->string('interviewer_name')->nullable();
            $table->string('interviewer_email')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_events');
    }
};
