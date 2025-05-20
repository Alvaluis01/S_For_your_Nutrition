<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    
    protected $table = 'factura'; 

   
    protected $fillable = [
        'Id_pedido',
        'Fecha_factura',
        'Id_producto',
        'Cantidad',
        'valor_unitario',
        'Subtotal',
    ];

    
    public $timestamps = false;
}
