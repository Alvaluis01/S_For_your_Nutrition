<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CantidadIngrediente;

class CantidadIngredienteController extends Controller
{
    // Obtener todos los registros
    public function index()
    {
        $cantidadIngredientes = CantidadIngrediente::all();
        return response()->json($cantidadIngredientes);
    }

    // Obtener un registro por ID
    public function show($id)
    {
        $cantidadIngrediente = CantidadIngrediente::find($id);
        if ($cantidadIngrediente) {
            return response()->json($cantidadIngrediente);
        } else {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }
    }

    // Crear un nuevo registro
    public function store(Request $request)
    {
        $cantidadIngrediente = CantidadIngrediente::create($request->all());
        return response()->json($cantidadIngrediente, 201);
    }

    // Actualizar un registro existente
    public function update(Request $request, $id)
    {
        $cantidadIngrediente = CantidadIngrediente::find($id);
        if ($cantidadIngrediente) {
            $cantidadIngrediente->update($request->all());
            return response()->json($cantidadIngrediente);
        } else {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }
    }

    // Eliminar un registro
    public function destroy($id)
    {
        $cantidadIngrediente = CantidadIngrediente::find($id);
        if ($cantidadIngrediente) {
            $cantidadIngrediente->delete();
            return response()->json(['message' => 'Registro eliminado con éxito']);
        } else {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }
    }
}
