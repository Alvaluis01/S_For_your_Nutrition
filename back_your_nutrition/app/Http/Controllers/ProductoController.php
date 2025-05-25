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
    // Buscar por ID numérico primero
    $producto = Producto::find($id);
    
    // Si no se encuentra, buscar por nombre
    if (!$producto) {
        $producto = Producto::where('Nombre', urldecode($id))->first();
    }

    if ($producto) {
        return response()->json($producto);
    }
    
    return response()->json(['error' => 'Producto no encontrado'], 404);
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
    $producto = Producto::find($id);
    
    if (!$producto) {
        $producto = Producto::where('Nombre', urldecode($id))->first();
    }

    if ($producto) {
        $producto->update($request->all());
        return response()->json($producto);
    }
    
    return response()->json(['error' => 'Producto no encontrado'], 404);
}

    // Eliminar un registro de producto
    public function destroy($id)
{
    $producto = Producto::find($id);
    
    if (!$producto) {
        $producto = Producto::where('Nombre', urldecode($id))->first();
    }

    if ($producto) {
        $producto->delete();
        return response()->json(['message' => 'Producto eliminado']);
    }
    
    return response()->json(['error' => 'Producto no encontrado'], 404);
    }
}

