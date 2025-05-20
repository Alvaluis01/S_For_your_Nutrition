<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use Illuminate\Http\Request;

class FacturaController extends Controller
{
    // Mostrar todos los registros de facturas
    public function index()
    {
        return Factura::all();
    }

    // Mostrar un registro de factura específico
    public function show($id)
    {
        return Factura::findOrFail($id);
    }

    // Crear un nuevo registro de factura
    public function store(Request $request)
    {
        $factura = Factura::create($request->all());
        return response()->json($factura, 201);
    }

    // Actualizar un registro de factura existente
    public function update(Request $request, $id)
    {
        $factura = Factura::findOrFail($id);
        $factura->update($request->all());
        return response()->json($factura, 200);
    }

    // Eliminar un registro de factura
    public function destroy($id)
    {
        Factura::destroy($id);
        return response()->json(null, 204);
    }
}
