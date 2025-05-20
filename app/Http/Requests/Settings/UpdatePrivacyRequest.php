<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePrivacyRequest extends FormRequest
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
            'share_analytics_data' => 'sometimes|boolean',
            'allow_personalized_ads' => 'sometimes|boolean',
            'account_visibility' => 'required|in:public,private',
            'data_retention_period' => 'required|string',
            'connected_integrations' => 'nullable|array',
            'connected_integrations.*' => 'string',
        ];
    }
}
