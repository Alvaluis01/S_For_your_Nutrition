<?php

namespace App\Http\Controllers;

use App\Models\TipoCompra;
use Illuminate\Http\Request;

class TipoCompraController extends Controller
{
    // Mostrar todos los registros de tipo compra
    public function index()
    {
        return TipoCompra::all();
    }

    // Mostrar un registro de tipo compra específico
    public function show($id)
    {
        return TipoCompra::findOrFail($id);
    }

    // Crear un nuevo registro de tipo compra
    public function store(Request $request)
    {
        $tipoCompra = TipoCompra::create($request->all());
        return response()->json($tipoCompra, 201);
    }

    // Actualizar un registro de tipo compra existente
    public function update(Request $request, $id)
    {
        $tipoCompra = TipoCompra::findOrFail($id);
        $tipoCompra->update($request->all());
        return response()->json($tipoCompra, 200);
    }

    // Eliminar un registro de tipo compra
    public function destroy($id)
    {
        TipoCompra::destroy($id);
        return response()->json(null, 204);
    }
}
