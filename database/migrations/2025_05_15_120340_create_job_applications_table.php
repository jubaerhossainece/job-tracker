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
            $table->string('company_name');
            $table->string('position_title');
            $table->enum('status', ['applied', 'interview', 'offer', 'rejected']);
            $table->dateTime('applied_at');
            $table->string('job_url')->nullable();
            $table->string('location');
            $table->text('notes')->nullable();
            $table->string('resume_path')->nullable();
            $table->text('cover_letter')->nullable();
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
