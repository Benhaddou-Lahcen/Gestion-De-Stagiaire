<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjetRequest extends FormRequest
{
    public function authorize()
    {
        // Autoriser la requête pour l'utilisateur actuel
        return true;
    }

    public function rules()
{
    return [
        'titre' => 'required|string|max:100',
        'description' => 'required|string',
        'user_id' => 'required|exists:users,id', // Assurez-vous que user_id est valide
    ];
}

}
