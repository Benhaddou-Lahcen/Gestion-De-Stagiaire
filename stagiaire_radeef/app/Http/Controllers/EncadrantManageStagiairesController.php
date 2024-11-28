<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserEncadrant;
use App\Http\Resources\StagiaireResource;
use App\Models\User; // Assurez-vous que cette ligne est présente

class EncadrantManageStagiairesController extends Controller
{
    /**
     * Get the IDs of stagiaires assigned to the authenticated encadrant.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStagiaireDetailsByEncadrant()
    {
        // Retrieve the authenticated encadrant ID
        $encadrantId = Auth::id();

        // Get all user IDs assigned to this encadrant
        $userEncadrants = UserEncadrant::where('encadrant_id', $encadrantId)->get();

        // Extract the user IDs from the records
        $stagiaireIds = $userEncadrants->pluck('user_id');

        // Retrieve the user details based on the IDs
        $stagiaires = User::whereIn('id', $stagiaireIds)->get();

        // Return the list of stagiaire details as JSON response
        return response()->json([
            'data' => StagiaireResource::collection($stagiaires)
        ]);
    }
}
