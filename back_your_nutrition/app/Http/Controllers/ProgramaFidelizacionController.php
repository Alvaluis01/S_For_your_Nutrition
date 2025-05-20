<?php

namespace App\Http\Controllers;

use App\Models\ProgramaFidelizacion;
use Illuminate\Http\Request;

class ProgramaFidelizacionController extends Controller
{
    // Mostrar todos los registros de programa de fidelización
    public function index()
    {
        return ProgramaFidelizacion::all();
    }

    // Mostrar un registro de programa de fidelización específico
    public function show($id)
    {
        return ProgramaFidelizacion::findOrFail($id);
    }

    // Crear un nuevo registro de programa de fidelización
    public function store(Request $request)
    {
        $programaFidelizacion = ProgramaFidelizacion::create($request->all());
        return response()->json($programaFidelizacion, 201);
    }

    // Actualizar un registro de programa de fidelización existente
    public function update(Request $request, $id)
    {
        $programaFidelizacion = ProgramaFidelizacion::findOrFail($id);
        $programaFidelizacion->update($request->all());
        return response()->json($programaFidelizacion, 200);
    }

    // Eliminar un registro de programa de fidelización
    public function destroy($id)
    {
        ProgramaFidelizacion::destroy($id);
        return response()->json(null, 204);
    }
}
