<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    
    protected $table = 'pedido'; 

    
    protected $fillable = [
        'Id_cliente',
        'Id_factura',
        'Fecha',
        'Estado',
        'Id_ingrediente',
        'Id_tipo_compra',
        'Ubicacion_entrega',
        'Total',
        'Id_Metodo_pago',
    ];

    
    public $timestamps = false;
}

