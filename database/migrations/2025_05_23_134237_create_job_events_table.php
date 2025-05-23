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
        Schema::create('job_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_application_id')->constrained()->onDelete('cascade');
            $table->string('event_type');  // application_submitted, phone_screen, technical_interview, etc.
            $table->string('title');       // Custom or generated title for the event
            $table->date('event_date');    // When the event occurred or will occur
            $table->time('event_time')->nullable(); // Time for scheduled events like interviews
            $table->text('notes')->nullable();
            $table->string('interviewer_name')->nullable();
            $table->string('interviewer_email')->nullable();
            $table->string('location')->nullable(); // For in-person interviews
            $table->string('meeting_link')->nullable(); // For virtual interviews
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_events');
    }
};
