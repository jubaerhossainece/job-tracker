<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePreferencesRequest extends FormRequest
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
            'theme' => 'in:light,dark',
            'language' => 'string|max:5',
            'currency' => 'string|max:10',
            'date_format' => 'string',
            'font_size' => 'in:small,medium,large',
            'dashboard_layout' => 'in:grid,list',
        ];
    }
}
