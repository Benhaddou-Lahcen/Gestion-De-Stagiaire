<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RapportResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'contenu' => asset('storage/'.$this->contenu), // URL vers le fichier
            'projet_id' => $this->projet_id, // Titre du projet
            'user_id' => $this->user_id, // Stagiaire
            'encadrant_id' => $this->encadrant_id, // Encadrant
            'date_soumission' => $this->date_soumission,
            'evaluation' => $this->evaluation,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

