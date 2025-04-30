<?php

namespace App\Http\Controllers;

use App\Models\Departamento;
use Illuminate\Http\Request;

class DepartamentoController extends Controller
{
    public function index()
    {
        return Departamento::all();
    }

    public function store(Request $request)
    {
        $departamento = Departamento::create($request->all());
        return response()->json($departamento, 201);
    }

    public function show($id)
    {
        return Departamento::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $departamento = Departamento::findOrFail($id);
        $departamento->update($request->all());
        return response()->json($departamento, 200);
    }

    public function destroy($id)
    {
        Departamento::destroy($id);
        return response()->json(null, 204);
    }
}
