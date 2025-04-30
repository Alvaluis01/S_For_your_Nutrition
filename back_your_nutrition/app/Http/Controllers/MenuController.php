<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    // Mostrar todos los registros de menú
    public function index()
    {
        return Menu::all();
    }

    // Mostrar un registro de menú específico
    public function show($id)
    {
        return Menu::findOrFail($id);
    }

    // Crear un nuevo registro de menú
    public function store(Request $request)
    {
        $menu = Menu::create($request->all());
        return response()->json($menu, 201);
    }

    // Actualizar un registro de menú existente
    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);
        $menu->update($request->all());
        return response()->json($menu, 200);
    }

    // Eliminar un registro de menú
    public function destroy($id)
    {
        Menu::destroy($id);
        return response()->json(null, 204);
    }
}
