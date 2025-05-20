<?php

namespace App\Http\Controllers;

use App\Models\Notificacion;
use Illuminate\Http\Request;

class NotificacionController extends Controller
{
    // Mostrar todos los registros de notificaciones
    public function index()
    {
        return Notificacion::all();
    }

    // Mostrar un registro de notificación específico
    public function show($id)
    {
        return Notificacion::findOrFail($id);
    }

    // Crear un nuevo registro de notificación
    public function store(Request $request)
    {
        $notificacion = Notificacion::create($request->all());
        return response()->json($notificacion, 201);
    }

    // Actualizar un registro de notificación existente
    public function update(Request $request, $id)
    {
        $notificacion = Notificacion::findOrFail($id);
        $notificacion->update($request->all());
        return response()->json($notificacion, 200);
    }

    // Eliminar un registro de notificación
    public function destroy($id)
    {
        Notificacion::destroy($id);
        return response()->json(null, 204);
    }
}
