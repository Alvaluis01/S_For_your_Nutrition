<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'producto'; // Nombre de la tabla

    protected $fillable = [
        'Nombre',
        'Precio',
        'Disponibilidad',
        'Id_ingrediente',
        'Id_cantidad_ingrediente',
        'Descripcion',
        'Tamaño',
        'Calorias'
    ];
}
