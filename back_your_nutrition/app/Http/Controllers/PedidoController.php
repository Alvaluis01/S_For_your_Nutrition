<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    // Mostrar todos los registros de pedidos
    public function index()
    {
        return Pedido::all();
    }

    // Mostrar un registro de pedido específico
    public function show($id)
    {
        return Pedido::findOrFail($id);
    }

    // Crear un nuevo registro de pedido
    public function store(Request $request)
    {
        $pedido = Pedido::create($request->all());
        return response()->json($pedido, 201);
    }

    // Actualizar un registro de pedido existente
    public function update(Request $request, $id)
    {
        $pedido = Pedido::findOrFail($id);
        $pedido->update($request->all());
        return response()->json($pedido, 200);
    }

    // Eliminar un registro de pedido
    public function destroy($id)
    {
        Pedido::destroy($id);
        return response()->json(null, 204);
    }
}
