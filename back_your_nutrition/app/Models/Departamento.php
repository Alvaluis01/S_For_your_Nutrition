<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    protected $table = 'departamento'; 

    public $timestamps = false; 

    protected $fillable = ['Nombre']; 
}
