<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreRapportRequest;
use App\Http\Resources\RapportResource;
use App\Models\Rapport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class RapportController extends Controller
{
    // Créer et soumettre un rapport
    public function store(StoreRapportRequest $request)
    {
        $file = $request->file('contenu');
        $filePath = $file->store('rapports', 'public'); // Sauvegarder le fichier dans storage/app/public/rapports

        $rapport = Rapport::create([
            'contenu' => $filePath,
            'projet_id' => $request->projet_id,
            'user_id' => $request->user_id, // Stagiaire
            'encadrant_id' => $request->encadrant_id, // Encadrant
            'date_soumission' => $request->date_soumission,
        ]);

        return new RapportResource($rapport);
    }

    public function evaluate(Request $request, Rapport $rapport)
{
    // Validation des données d'entrée
    $validated = $request->validate([
        'evaluation' => 'required|integer|min:1|max:20',
    ]);

    // Mettre à jour le rapport avec l'évaluation
    $rapport->evaluation = $validated['evaluation'];
    $rapport->save();

    return response()->json(['message' => 'Évaluation mise à jour avec succès']);
}

    public function getRapportByProjet($projet_id)
{
    $rapport = Rapport::where('projet_id', $projet_id)->first();

    if ($rapport) {
        return response()->json(['data' => $rapport], 200);
    } else {
        return response()->json(['message' => 'Aucun rapport soumis pour ce projet'], 404);
    }
}

public function getRapportId($encadrant_id, $stagiaire_id)
{
    $rapport = Rapport::where('user_id', $stagiaire_id)
                      ->where('encadrant_id', $encadrant_id)
                      ->first();

    if (!$rapport) {
        return response()->json(['message' => 'Aucun rapport trouvé.'], 404);
    }

    return response()->json(['rapport_id' => $rapport->id]);
}
public function getEvaluation($user_id)
{
    // Rechercher le rapport du stagiaire
    $rapport = Rapport::where('user_id', $user_id)->first();

    if (!$rapport) {
        return response()->json(['message' => 'Aucun rapport trouvé pour ce stagiaire.'], 404);
    }

    // Retourner l'évaluation et les détails du rapport
    return response()->json([
        'evaluation' => $rapport->evaluation,
        'message' => 'Évaluation récupérée avec succès.'
    ]);
}

}
