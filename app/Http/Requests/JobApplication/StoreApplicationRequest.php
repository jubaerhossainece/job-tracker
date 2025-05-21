<?php

namespace App\Http\Requests\JobApplication;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company_name' => 'required|string',
            'position_title' => 'required|string',
            'status' => 'required|in:applied,interview,offer,rejected',
            'applied_at' => 'required|date',
            'job_url' => 'nullable|url',
            'location' => 'required|string',
            'notes' => 'nullable|string',
            'resume' => 'nullable|file|mimes:pdf,doc,docx',
            'cover_letter' => 'nullable|string',
        ];
    }
}
