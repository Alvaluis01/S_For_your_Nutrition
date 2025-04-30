<?php

namespace App\Http\Controllers;

use App\Models\Repartidor;
use Illuminate\Http\Request;

class RepartidorController extends Controller
{
    // Mostrar todos los registros de repartidores
    public function index()
    {
        return Repartidor::all();
    }

    // Mostrar un registro de repartidor específico
    public function show($id)
    {
        return Repartidor::findOrFail($id);
    }

    // Crear un nuevo registro de repartidor
    public function store(Request $request)
    {
        $repartidor = Repartidor::create($request->all());
        return response()->json($repartidor, 201);
    }

    // Actualizar un registro de repartidor existente
    public function update(Request $request, $id)
    {
        $repartidor = Repartidor::findOrFail($id);
        $repartidor->update($request->all());
        return response()->json($repartidor, 200);
    }

    // Eliminar un registro de repartidor
    public function destroy($id)
    {
        Repartidor::destroy($id);
        return response()->json(null, 204);
    }
}
