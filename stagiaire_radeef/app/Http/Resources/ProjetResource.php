<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjetResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'titre' => $this->titre,
            'description' => $this->description,
            'user_id' => $this->user_id,
            'encadrant_id' => $this->encadrant_id,
            'updated_at' => $this->updated_at

        ];
    }
}
