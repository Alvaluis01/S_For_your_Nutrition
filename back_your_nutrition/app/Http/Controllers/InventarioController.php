<?php

namespace App\Http\Controllers;

use App\Models\Inventario;
use Illuminate\Http\Request;

class InventarioController extends Controller
{
    // Mostrar todos los registros de inventario
    public function index()
    {
        return Inventario::all();
    }

    // Mostrar un registro de inventario específico
    public function show($id)
{
    $inventario = Inventario::find($id);
    
    if ($inventario) {
        return response()->json($inventario);
    }
    
    return response()->json(['error' => 'Registro no encontrado'], 404);
}

    // Crear un nuevo registro de inventario
    public function store(Request $request)
    {
        $inventario = Inventario::create($request->all());
        return response()->json($inventario, 201);
    }

    // Actualizar un registro de inventario existente
    public function update(Request $request, $id)
{
    $inventario = Inventario::find($id);
    
    if ($inventario) {
        $inventario->update($request->all());
        return response()->json($inventario);
    }
    
    return response()->json(['error' => 'Registro no encontrado'], 404);
}

    // Eliminar un registro de inventario
    public function destroy($id)
    {
        Inventario::destroy($id);
        return response()->json(null, 204);
    }
}
