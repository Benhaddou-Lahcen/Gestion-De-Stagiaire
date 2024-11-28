<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserEncadrant extends Model
{
    use HasFactory;

    protected $table = 'user_encadrant';

    protected $fillable = ['user_id', 'encadrant_id'];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function encadrant()
    {
        return $this->belongsTo(Encadrant::class, 'encadrant_id');
    }
}
