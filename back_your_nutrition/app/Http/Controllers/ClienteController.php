<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function index()
    {
        // Obtener todos los clientes
        $clientes = Cliente::with('persona')->get(); // Carga la relación persona si es necesario
        return response()->json($clientes);
    }

    public function show($id)
    {
        // Obtener un cliente específico
        $cliente = Cliente::with('persona')->find($id);

        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        return response()->json($cliente);
    }

    public function store(Request $request)
    {
        // Validar y crear un nuevo cliente
        $validated = $request->validate([
            'Id_persona' => 'required|integer',
            'Id_tipo_compra' => 'required|integer',
            'Puntos_fidelizacion' => 'required|integer',
            'Descuento_inicial' => 'required|boolean',
        ]);

        $cliente = Cliente::create($validated);

        return response()->json($cliente, 201);
    }

    public function update(Request $request, $id)
    {
        // Validar y actualizar un cliente existente
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        $validated = $request->validate([
            'Id_persona' => 'integer',
            'Id_tipo_compra' => 'integer',
            'Puntos_fidelizacion' => 'integer',
            'Descuento_inicial' => 'boolean',
        ]);

        $cliente->update($validated);

        return response()->json($cliente);
    }

    public function destroy($id)
    {
        // Eliminar un cliente
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        $cliente->delete();

        return response()->json(['message' => 'Cliente eliminado']);
    }
}
