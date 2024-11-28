<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Encadrant extends Authenticatable
{
    use HasApiTokens,HasFactory,Notifiable,SoftDeletes;

    protected $fillable = [
        'firstname',
        'lastname',
        'date_of_birth',
        'gender',
        'address',
        'phone',
        'email',
        'password',
        'departement',
        'updated_at'

      ];
      protected $hidden = [
        'password',
        'email_verified_at',
        'remember_token',
        'created_at',
      ];
      protected $casts = [
        'date_of_birth' => 'date:Y-m-d',
      ];
      public function userEncadrants()
      {
          return $this->hasMany(UserEncadrant::class);
      }
      public function projets()
{
    return $this->hasMany(Projet::class, 'encadrant_id');
}


    protected $appends = ['role'];
    public function getRoleAttribute(){
        return 'encadrant';
    }
}
