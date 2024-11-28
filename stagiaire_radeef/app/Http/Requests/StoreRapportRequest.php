<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRapportRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Autorisez la requête pour l'instant
    }

    public function rules()
    {
        return [
            'contenu' => 'required|file|mimes:pdf,docx|max:2048', // Valide le fichier
            'projet_id' => 'required|exists:projets,id',
            'user_id' => 'required|exists:users,id', // Doit correspondre à un stagiaire
            'encadrant_id' => 'required|exists:encadrants,id', // Doit correspondre à un encadrant
            'date_soumission' => 'required|date',
        ];
    }
}

