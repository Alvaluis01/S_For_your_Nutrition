<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;

class PersonaController extends Controller
{
    public function index()
    {
        return Persona::all(); // Obtener todas las personas
    }

    public function store(Request $request)
    {
        
        $persona = Persona::create($request->all());
        return response()->json($persona, 201); // Retornar la nueva persona creada
    }

    public function show($id)
    {
    $persona = Persona::find($id);
    if (!$persona) {
        return response()->json(['error' => 'Persona no encontrada'], 404);
    }
    return response()->json($persona);
    }

    public function update(Request $request, $id)
    {
        $persona = Persona::findOrFail($id);
        $persona->update($request->all());
        return response()->json($persona); // Retornar la persona actualizada
    }

    public function destroy($id)
    {
        Persona::destroy($id); // Eliminar una persona
        return response()->json(null, 204); // Retornar respuesta vacía
    }
}
