<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeccionMenu extends Model
{
    
    protected $table = 'seccion_menu'; 

    protected $fillable = [
        'Nombre',
        'Descripcion',
        'Calorias',
        'Id_producto',
        'Id_ingrediente_adicional',
    ];

    public $timestamps = false;
}

