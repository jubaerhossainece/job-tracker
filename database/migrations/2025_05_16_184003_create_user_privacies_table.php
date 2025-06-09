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
        Schema::create('user_privacies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('profile_visible')->default(true);
            $table->boolean('show_email')->default(false);
            $table->boolean('show_phone')->default(false);
            $table->boolean('show_social_links')->default(true);
            $table->boolean('allow_search_engines')->default(false);
            $table->boolean('data_processing_consent')->default(true);
            $table->boolean('marketing_consent')->default(false);
            $table->boolean('analytics_consent')->default(true);
            $table->timestamp('last_data_export')->nullable();
            $table->timestamps();
            
            $table->unique('user_id');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_privacies');
    }
};
