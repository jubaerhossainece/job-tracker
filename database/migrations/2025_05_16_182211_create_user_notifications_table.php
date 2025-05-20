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
        
            // Channels
            $table->boolean('email_notifications')->default(true);
            $table->boolean('push_notifications')->default(false);
            $table->boolean('sms_notifications')->default(false);
        
            // Types
            $table->boolean('account_activity')->default(true);
            $table->boolean('new_features_updates')->default(true);
            $table->boolean('marketing_promotions')->default(false);
        
            // Frequency
            $table->enum('notification_frequency', ['real-time', 'digest', 'quiet-hours'])->default('real-time');
            
            // Quiet Hours
            $table->time('quiet_hours_start')->nullable();
            $table->time('quiet_hours_end')->nullable();
        
            $table->timestamps();
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
