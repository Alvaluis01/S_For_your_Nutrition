<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $table = 'pedido';
    public $timestamps = false;

    protected $fillable = [
        'cliente',
        'fecha',
        'estado',
        'total'
    ];

    public function detalles()
    {
        return $this->hasMany(DetallePedido::class, 'pedido_id');
    }
}