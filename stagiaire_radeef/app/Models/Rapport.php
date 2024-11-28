<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Rapport extends Authenticatable
{
    use HasApiTokens,HasFactory,Notifiable,SoftDeletes;

    protected $fillable = [
        'contenu',
        'projet_id',//fait reference a la table Projet
        'user_id',//fait reference a la table User
        'encadrant_id',//fait reference a la table Encadrant
        'updated_at',
        'date_soumission',
        'evaluation',

      ];


    }

