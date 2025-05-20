<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramaFidelizacion extends Model
{
    
    protected $table = 'programa_fidelizacion'; 

    
    protected $fillable = [
        'Id_cliente',
        'Puntos_acumulados',
        'Estado',
    ];

    
    public $timestamps = false;
}
