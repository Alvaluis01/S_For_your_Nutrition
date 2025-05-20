<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GestorPedido extends Model
{
    
    protected $table = 'gestor_pedidos';

   
    protected $primaryKey = 'Id';

    public $timestamps = false;

    
    protected $fillable = [
        'Id_persona', 
        'Fecha_contratacion', 
        'Salario'
    ];
}
