<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IngredienteAdicional extends Model
{
    protected $table = 'ingrediente_adicional'; 

    protected $fillable = [
        'Nombre',
        'Precio',
        'Cantidad',
        'Unidad_medida',
        'Id_ingrediente',
    ];

    public $timestamps = false;
}
