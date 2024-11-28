<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjetRequest;
use App\Http\Resources\ProjetResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Projet;
use Illuminate\Validation\ValidationException;

class ProjetController extends Controller
{
    // Méthode pour créer un projet
    public function store(StoreProjetRequest $request)
    {
        $validated = $request->validated();

        // Récupérer l'ID de l'encadrant connecté
        $encadrant_id = Auth::id();

        // Vérifier si le stagiaire a déjà un projet
        $existingProject = Projet::where('user_id', $validated['user_id'])->first();
        if ($existingProject) {
            // Retourner une réponse d'erreur si le stagiaire a déjà un projet
            throw ValidationException::withMessages([
                'user_id' => 'Ce stagiaire a déjà un projet associé.',
            ]);
        }

        // Créer un nouveau projet avec les données validées
        $projet = Projet::create([
            'titre' => $validated['titre'],
            'description' => $validated['description'],
            'user_id' => $validated['user_id'],
            'encadrant_id' => $encadrant_id,
        ]);

        return new ProjetResource($projet);
    }


    // App\Http\Controllers\ProjetController.php

public function show($user_id)
{
    // Récupérer le projet pour l'utilisateur spécifié
    $projet = Projet::where('user_id', $user_id)->first();

    if ($projet) {
        return new ProjetResource($projet);
    } else {
        return response()->json(['message' => 'Projet non trouvé'], 404);
    }
}


// App\Http\Controllers\ProjetController.php

public function update(Request $request, $user_id)
{
    $validated = $request->validate([
        'titre' => 'required|string|max:100',
        'description' => 'required|string',
    ]);

    // Trouver le projet à mettre à jour en utilisant user_id
    $projet = Projet::where('user_id', $user_id)->first();

    if (!$projet) {
        return response()->json(['message' => 'Projet non trouvé'], 404);
    }

    // Mettre à jour le projet avec les nouvelles données
    $projet->update([
        'titre' => $validated['titre'],
        'description' => $validated['description'],
    ]);

    return new ProjetResource($projet);
}


// App\Http\Controllers\ProjetController.php

public function destroy($user_id)
{
    // Trouver le projet à supprimer en utilisant user_id
    $projet = Projet::where('user_id', $user_id)->first();

    if (!$projet) {
        return response()->json(['message' => 'Projet non trouvé'], 404);
    }

    // Supprimer le projet
    $projet->delete();

    return response()->json(['message' => 'Projet supprimé avec succès']);
}


}
