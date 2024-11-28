<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EncadrantResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'date_of_birth' => $this->date_of_birth,
            'gender' => $this->gender,
            'address' => $this->address,
            'phone' => $this->phone,
            'email' => $this->email,
            'departement' => $this->departement,
            'updated_at' => $this->updated_at

        ];
    }
}
