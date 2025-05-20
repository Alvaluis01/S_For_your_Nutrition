<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventario extends Model
{
    protected $table = 'inventario'; 
    

    protected $fillable = [
        'Fecha_ingreso',
        'Id_ingrediente',
    ];

   
    public $timestamps = false;
}
