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
    // public function store(Request $request)
    // {
    //     $pedido = Pedido::create($request->all());
    //     return response()->json($pedido, 201);
    // }



    public function store(Request $request)
{
    // Aquí recibimos los datos del pedido junto con los ingredientes adicionales.
    $pedido = Pedido::create([
        'Id_cliente' => $request->Id_cliente,
        'Fecha' => now(), // O usa la fecha proporcionada si la pasas desde el frontend
        'Estado' => 'pendiente', // O el estado que desees asignar
        'Id_ingrediente' => implode(',', $request->Id_ingrediente), // Convertir el array de ingredientes en una cadena
        'Id_tipo_compra' => $request->Id_tipo_compra,
        'Ubicacion_entrega' => $request->Ubicacion_entrega,
        'Total' => $request->Total,
        'Id_Metodo_pago' => $request->Id_Metodo_pago,
    ]);
    
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
