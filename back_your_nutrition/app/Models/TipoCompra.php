<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoCompra extends Model
{
    protected $table = 'tipo_compra'; 

    protected $fillable = [
        'Descripcion',
    ];

    public $timestamps = false;
}
