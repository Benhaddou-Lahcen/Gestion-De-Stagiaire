<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEncadrantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'firstname' => 'required|max:50',
            'lastname' => 'required|max:50',
            'date_of_birth' => 'required|date',
            'gender' => ['required', Rule::in(['m', 'f'])],
            'address' => 'required|max:255',
            'phone' => 'required|max:10|unique:encadrants',
            'email' => 'required|email|unique:encadrants',
            'password' => 'required|min:3',
            'departement' => 'required|max:255'
        ];
    }
}
