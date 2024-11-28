<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Validation\Rule;
class UpdateEncadrantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'firstname' => 'required|max:50',
            'lastname' => 'required|max:50',
            'date_of_birth' => 'required|date',
            'gender' => ['required', Rule::in(['m', 'f'])],
            'address' => 'required|max:255',
            'phone' => Rule::unique('encadrants')->ignore($this->id),
            'email' => Rule::unique('encadrants')->ignore($this->id),
            'password' => 'required|min:3',
            'departement' => 'required|max:255'
        ];
    }
}
