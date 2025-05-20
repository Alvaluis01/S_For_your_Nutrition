<?php

namespace App\Http\Controllers;
use App\Models\DetallePedido;
use Illuminate\Support\Facades\DB;

use App\Models\Pedido;
use Illuminate\Http\Request;

class PedidoController extends Controller
{public function guardarPedido(Request $request)
{
    try {
        DB::beginTransaction();

        // Guardar el pedido principal
        $pedido = Pedido::create([
            'cliente' => $request->cliente ?? 'Cliente no especificado',
            'fecha' => $request->fecha,
            'estado' => $request->estado,
            'total' => $request->total
        ]);

        // Guardar los productos (detalles del pedido)
        foreach ($request->productos as $producto) {
            DetallePedido::create([
                'pedido_id' => $pedido->id,
                'producto_id' => $producto['id'],
                'cantidad' => $producto['cantidad'],
                'ingredientes' => json_encode($producto['ingredientesAdicionales'] ?? [])
            ]);
        }

        DB::commit();

        return response()->json([
            'message' => 'Pedido guardado con éxito',
            'pedido_id' => $pedido->id
        ], 201);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'error' => 'Error al guardar el pedido',
            'message' => $e->getMessage()
        ], 500);
    }
}



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
    // public function store(Request $request)
    // {
    //     $pedido = Pedido::create($request->all());
    //     return response()->json($pedido, 201);
    // }



      public function store(Request $request)
    {
        $pedido = Pedido::create([
            'fecha' => $request->fecha,
            'estado' => $request->estado,
            'total' => $request->total
        ]);

        // Aquí podrías guardar también los productos relacionados
        return response()->json(['message' => 'Pedido registrado', 'pedido' => $pedido], 201);
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