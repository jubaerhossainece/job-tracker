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
        Schema::create('user_preferences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('theme')->default('light'); // light, dark
            $table->string('language')->default('en');
            $table->string('currency', 10)->default('USD');
            $table->string('date_format')->default('YYYY-MM-DD');
            $table->string('font_size')->default('medium'); // small, medium, large
            $table->string('dashboard_layout')->default('grid'); // grid, list, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_preferences');
    }
};
