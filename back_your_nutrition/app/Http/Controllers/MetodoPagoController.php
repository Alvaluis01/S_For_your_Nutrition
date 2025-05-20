<?php

namespace App\Http\Controllers;

use App\Models\MetodoPago;
use Illuminate\Http\Request;

class MetodoPagoController extends Controller
{
    // Mostrar todos los registros de método de pago
    public function index()
    {
        return MetodoPago::all();
    }

    // Mostrar un registro de método de pago específico
    public function show($id)
    {
        return MetodoPago::findOrFail($id);
    }

    // Crear un nuevo registro de método de pago
    public function store(Request $request)
    {
        $metodoPago = MetodoPago::create($request->all());
        return response()->json($metodoPago, 201);
    }

    // Actualizar un registro de método de pago existente
    public function update(Request $request, $id)
    {
        $metodoPago = MetodoPago::findOrFail($id);
        $metodoPago->update($request->all());
        return response()->json($metodoPago, 200);
    }

    // Eliminar un registro de método de pago
    public function destroy($id)
    {
        MetodoPago::destroy($id);
        return response()->json(null, 204);
    }
}
