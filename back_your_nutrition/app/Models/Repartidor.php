<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Repartidor extends Model
{
   
    protected $table = 'repartidor'; 

    
    protected $fillable = [
        'Id_persona',
        'Fecha_contratacion',
        'Salario',
        'Direccion',
    ];

    public $timestamps = false;
}
