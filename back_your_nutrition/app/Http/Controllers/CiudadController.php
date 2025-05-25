<?php

namespace App\Http\Controllers;

use App\Models\Ciudad;
use Illuminate\Http\Request;

class CiudadController extends Controller
{
    public function index()
    {
        return Ciudad::all();
    }

    public function show($id)
    {
        return Ciudad::findOrFail($id);
    }

    public function store(Request $request)
    {
        return Ciudad::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $ciudad = Ciudad::findOrFail($id);
        $ciudad->update($request->all());
        return $ciudad;
    }

    public function destroy($id)
    {
        $ciudad = Ciudad::findOrFail($id);
        $ciudad->delete();
        return response()->json(['message' => 'Ciudad eliminada']);
    }
}
