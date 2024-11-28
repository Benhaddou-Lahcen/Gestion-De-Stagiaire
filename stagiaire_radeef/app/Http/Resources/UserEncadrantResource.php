<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserEncadrantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'encadrant_id' => $this->encadrant_id,
            'user' => new UserResource($this->whenLoaded('user')),
            'encadrant' => new EncadrantResource($this->whenLoaded('encadrant')),
        ];
    }
}
