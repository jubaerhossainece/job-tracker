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
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id(); // You can use $table->uuid('id')->primary() if you prefer UUID
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // If you have a jobs table
            $table->string('company_name');
            $table->string('position_title');
            $table->enum('status', ['applied', 'interview', 'offer', 'rejected']);
            $table->date('applied_at');
            $table->string('job_url')->nullable();
            $table->string('location');
            $table->text('notes')->nullable();
            $table->string('resume_path')->nullable();
            $table->text('cover_letter')->nullable();
            // Add these fields to your existing migration:
            $table->string('salary_range')->nullable();
            $table->enum('employment_type', ['full-time', 'part-time', 'contract', 'internship'])->default('full-time');
            $table->enum('work_arrangement', ['onsite', 'remote', 'hybrid'])->nullable();
            $table->string('contact_person')->nullable();
            $table->string('contact_email')->nullable();
            $table->date('follow_up_date')->nullable();
            $table->integer('priority')->default(1); // 1-5 priority scale
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
