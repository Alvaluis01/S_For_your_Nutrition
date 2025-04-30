<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ingrediente extends Model
{
    
    protected $table = 'ingrediente'; 

    
    protected $fillable = [
        'Nombre',
        'Cantidad',
        'Fecha_llegada',
        'Fecha_vencimiento', 
    ];

    
    public $timestamps = false;
}
