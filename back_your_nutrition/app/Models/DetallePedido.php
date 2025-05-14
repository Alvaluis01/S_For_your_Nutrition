<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class DetallePedido extends Model
{
    protected $table = 'detalle_pedido';

    protected $fillable = [
        'Id_pedido',
        'Id_producto',
        'Id_ingrediente',
        'Cantidad',
    ];

    public $timestamps = false;
}
