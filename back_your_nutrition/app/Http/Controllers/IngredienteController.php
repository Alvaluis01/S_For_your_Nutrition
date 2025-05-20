<?php

namespace App\Http\Controllers;

use App\Models\Ingrediente;
use Illuminate\Http\Request;

class IngredienteController extends Controller
{
    // Mostrar todos los ingredientes
    public function index()
    {
        return response()->json(Ingrediente::all());
    }

    // Mostrar un ingrediente específico
    public function show($id)
    {
        return Ingrediente::findOrFail($id);
    }

    // Crear un nuevo ingrediente
    public function store(Request $request)
    {
        $ingrediente = Ingrediente::create($request->all());
        return response()->json($ingrediente, 201);
    }

    // Actualizar un ingrediente existente
    public function update(Request $request, $id)
    {
        $ingrediente = Ingrediente::findOrFail($id);
        $ingrediente->update($request->all());
        return response()->json($ingrediente, 200);
    }

    // Eliminar un ingrediente
    public function destroy($id)
    {
        Ingrediente::destroy($id);
        return response()->json(null, 204);
    }
}
