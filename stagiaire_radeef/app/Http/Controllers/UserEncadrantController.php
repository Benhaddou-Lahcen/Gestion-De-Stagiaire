<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserEncadrantRequest;
use App\Models\UserEncadrant;
use Illuminate\Http\Request;

class UserEncadrantController extends Controller
{
    public function index()
    {
        return response()->json(UserEncadrant::all());
    }

    public function store(StoreUserEncadrantRequest $request)
    {
        // Vérifier si le stagiaire a déjà un ou deux encadrants assignés
        $existingAssignments = UserEncadrant::where('user_id', $request->user_id)->count();

        if ($existingAssignments >= 2) {
            return response()->json(['message' => 'Le stagiaire ne peut pas être assigné à plus de deux encadrants.'], 422);
        }

        $assignment = UserEncadrant::create($request->validated());

        return response()->json($assignment, 201);
    }

    public function show($id)
    {
        $assignment = UserEncadrant::findOrFail($id);
        return response()->json($assignment);
    }

    public function update(StoreUserEncadrantRequest $request, $id)
    {
        $assignment = UserEncadrant::findOrFail($id);
        $assignment->update($request->validated());
        return response()->json($assignment);
    }



    public function destroy($id)
    {
        $assignment = UserEncadrant::findOrFail($id);
        $assignment->delete();
        return response()->json(['message' => 'Assignation supprimée avec succès.']);
    }
}
