<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    
    protected $table = 'notificacion'; 

    
    protected $fillable = [
        'Id_persona',
        'Id_pedido',
        'Mensaje',
        'Fecha',
    ];

    
    public $timestamps = false;
}
