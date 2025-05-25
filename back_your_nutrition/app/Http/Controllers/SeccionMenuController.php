<?php

namespace App\Http\Controllers;

use App\Models\SeccionMenu;
use Illuminate\Http\Request;

class SeccionMenuController extends Controller
{
    // Mostrar todos los registros de sección de menú
    public function index()
    {
        return SeccionMenu::all();
    }

    // Mostrar un registro de sección de menú específico
    public function show($id)
    {
        return SeccionMenu::findOrFail($id);
    }

    // Crear un nuevo registro de sección de menú
    public function store(Request $request)
    {
        $seccionMenu = SeccionMenu::create($request->all());
        return response()->json($seccionMenu, 201);
    }

    // Actualizar un registro de sección de menú existente
    public function update(Request $request, $id)
    {
        $seccionMenu = SeccionMenu::findOrFail($id);
        $seccionMenu->update($request->all());
        return response()->json($seccionMenu, 200);
    }

    // Eliminar un registro de sección de menú
    public function destroy($id)
    {
        SeccionMenu::destroy($id);
        return response()->json(null, 204);
    }
}
