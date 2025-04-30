<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'cliente'; 

    protected $fillable = [
        'Id_persona',
        'Id_tipo_compra',
        'Puntos_fidelizacion',
        'Descuento_inicial',
    ];

}

