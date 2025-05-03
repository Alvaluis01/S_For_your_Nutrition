<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;

class PersonaController extends Controller
{
    public function store(Request $request)
{
    $persona = new Persona();
    $persona->Documento = $request->Documento;
    $persona->Nombres = $request->Nombres;
    $persona->Apellidos = $request->Apellidos;
    $persona->Telefono = $request->Telefono;
    $persona->Email = $request->Email;
    $persona->Direccion = $request->Direccion;
    $persona->Id_ciudad = $request->Id_ciudad;
    $persona->Contraseña = $request->Contraseña;
    $persona->save();

    return response()->json(['message' => 'Persona registrada correctamente'], 201);
}

    public function index()
    {
        return Persona::all(); // Obtener todas las personas
    }

    // public function store(Request $request)
    // {
        
    //     $persona = Persona::create($request->all());
    //     return response()->json($persona, 201); // Retornar la nueva persona creada
    // }

    public function login(Request $request)
{
    $this->validate($request, [
        'Documento' => 'required',
        'Contraseña' => 'required',
    ]);
    

    $persona = Persona::where('Documento', $request->Documento)->first();

    if (!$persona) {
        return response()->json(['error' => 'Documento no encontrado'], 404);
    }

    if ($persona->Contraseña !== $request->Contraseña) {
        return response()->json(['error' => 'Contraseña incorrecta'], 401);
    }

    return response()->json(['message' => 'Inicio de sesión exitoso']);
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
