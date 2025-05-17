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
            $table->boolean('share_analytics_data')->default(false);
            $table->boolean('allow_personalized_ads')->default(false);
            $table->enum('account_visibility', ['public', 'private'])->default('private');
            $table->string('data_retention_period')->default('1_year'); // or use enum
            $table->json('connected_integrations')->nullable(); // e.g. ["Google Analytics", "Facebook Pixel"]
            $table->timestamps();
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
