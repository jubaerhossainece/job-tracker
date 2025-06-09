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
        Schema::create('login_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('session_id')->nullable(); // null for login history records
            $table->string('ip_address', 45);
            $table->text('user_agent');
            $table->string('device_type')->nullable(); // mobile, desktop, tablet
            $table->string('browser')->nullable();
            $table->string('platform')->nullable();
            $table->string('location')->nullable(); // City, Country
            $table->enum('type', ['login', 'active_session']); // distinguish between login history and active sessions
            $table->enum('status', ['success', 'failed', 'blocked', 'active', 'expired'])->default('success');
            $table->string('failure_reason')->nullable(); // for failed login attempts
            $table->timestamp('last_activity')->nullable(); // for active sessions
            $table->timestamp('logged_in_at'); // when the login/session started
            $table->boolean('is_current')->default(false); // current active session
            $table->timestamps();
            
            $table->index(['user_id', 'type', 'logged_in_at']);
            $table->index(['user_id', 'is_current']);
            $table->index(['session_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('login_histories');
    }
};
