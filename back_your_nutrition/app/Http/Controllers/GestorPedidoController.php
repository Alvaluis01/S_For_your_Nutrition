<?php


namespace App\Http\Controllers;

use App\Models\GestorPedido;
use Illuminate\Http\Request;

class GestorPedidoController extends Controller
{
    // Obtener todos los gestores de pedidos
    public function index()
    {
        return response()->json(GestorPedido::all(), 200);
    }

    // Obtener un gestor de pedidos por ID
    public function show($id)
    {
        $gestorPedido = GestorPedido::find($id);
        if (is_null($gestorPedido)) {
            return response()->json(['message' => 'Gestor de pedidos no encontrado'], 404);
        }
        return response()->json($gestorPedido, 200);
    }

    // Crear un nuevo gestor de pedidos
    public function store(Request $request)
    {
        $this->validate($request, [
            'Id_persona' => 'required|integer',
            'Fecha_contratacion' => 'required|date',
            'Salario' => 'required|numeric',
        ]);

        $gestorPedido = GestorPedido::create($request->all());
        return response()->json($gestorPedido, 201);
    }

    // Actualizar un gestor de pedidos existente
    public function update(Request $request, $id)
    {
        $gestorPedido = GestorPedido::find($id);
        if (is_null($gestorPedido)) {
            return response()->json(['message' => 'Gestor de pedidos no encontrado'], 404);
        }

        $this->validate($request, [
            'Id_persona' => 'required|integer',
            'Fecha_contratacion' => 'required|date',
            'Salario' => 'required|numeric',
        ]);

        $gestorPedido->update($request->all());
        return response()->json($gestorPedido, 200);
    }

    // Eliminar un gestor de pedidos
    public function destroy($id)
    {
        $gestorPedido = GestorPedido::find($id);
        if (is_null($gestorPedido)) {
            return response()->json(['message' => 'Gestor de pedidos no encontrado'], 404);
        }

        $gestorPedido->delete();
        return response()->json(['message' => 'Gestor de pedidos eliminado'], 204);
    }
}
