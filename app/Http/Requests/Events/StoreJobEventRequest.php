<?php

namespace App\Http\Requests\Events;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && $this->route('application')->user_id === auth()->id();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'event_type' => 'required|string',
            'title' => 'required|string|max:255',
            'event_date' => 'required|date',
            'event_time' => 'nullable|date_format:H:i',
            'notes' => 'nullable|string',
            'interviewer_name' => 'nullable|string|max:255',
            'interviewer_email' => 'nullable|email|max:255',
            'location' => 'nullable|string|max:255',
            'meeting_link' => 'nullable|url|max:255',
        ];
    }
}
