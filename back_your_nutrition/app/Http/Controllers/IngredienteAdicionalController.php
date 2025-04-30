<?php

namespace App\Http\Controllers;

use App\Models\IngredienteAdicional;
use Illuminate\Http\Request;

class IngredienteAdicionalController extends Controller
{
    public function index()
    {
        return IngredienteAdicional::all();
    }

    public function show($id)
    {
        return IngredienteAdicional::findOrFail($id);
    }

    public function store(Request $request)
    {
        $ingredienteAdicional = IngredienteAdicional::create($request->all());
        return response()->json($ingredienteAdicional, 201);
    }

    public function update(Request $request, $id)
    {
        $ingredienteAdicional = IngredienteAdicional::findOrFail($id);
        $ingredienteAdicional->update($request->all());
        return response()->json($ingredienteAdicional, 200);
    }

    public function destroy($id)
    {
        IngredienteAdicional::destroy($id);
        return response()->json(null, 204);
    }
}
