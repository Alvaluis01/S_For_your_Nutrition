<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ciudad extends Model
{
    protected $table = 'ciudad'; // Nombre de la tabla
    protected $primaryKey = 'ID'; // Clave primaria
    public $timestamps = false; 

    protected $fillable = [
        'Nombre',
        'Id_departamento',
    ];
}
