<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    // Mostrar todos los registros de productos
    public function index()
    {
        return Producto::all();
    }

    // Mostrar un registro de producto específico
    public function show($id)
    {
        return Producto::findOrFail($id);
    }

    // Crear un nuevo registro de producto
    public function store(Request $request)
    {
        $producto = Producto::create($request->all());
        return response()->json($producto, 201);
    }

    // Actualizar un registro de producto existente
    public function update(Request $request, $id)
    {
        $producto = Producto::findOrFail($id);
        $producto->update($request->all());
        return response()->json($producto, 200);
    }

    // Eliminar un registro de producto
    public function destroy($id)
    {
        Producto::destroy($id);
        return response()->json(null, 204);
    }
}

