<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EncadrantController;
use App\Http\Controllers\StagiaireController;
use App\Http\Controllers\UserEncadrantController;
use App\Http\Controllers\EncadrantManageStagiairesController;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\RapportController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(static function() {
    Route::get('/me', function (Request $request) {
        return $request->user();
    });
});

Route::middleware(['auth:sanctum','ability:stagiaire'])->prefix('stagiaire')->group(static function () {
    Route::post('/rapports', [RapportController::class, 'store']);
    Route::get('/{user_id}/rapport/evaluation', [RapportController::class, 'getEvaluation']);

});

Route::middleware(['auth:sanctum','ability:admin'])->prefix('admin')->group(static function () {
    Route::apiResources([
        'encadrants' => EncadrantController::class,
        'stagiaires' => StagiaireController::class,
        'assign' => UserEncadrantController::class,
    ]);
});

/*Route::middleware(['auth:sanctum','ability:encadrant'])->prefix('encadrant')->group(static function () {
    /*Route::apiResources([
        'assigned-stagiaires' => UserEncadrantController::class,
    ]);
});*/




// Define the route for getting stagiaire IDs assigned to the authenticated encadrant
/*Route::middleware('auth:sanctum')->prefix('encadrant')->group(function () {
    Route::get('/stagiaire-ids', [EncadrantManageStagiairesController::class, 'getStagiaireIdsByEncadrant']);
});*/
Route::middleware('auth:sanctum')->prefix('encadrant')->group(function () {
    Route::get('/stagiaires', [EncadrantManageStagiairesController::class, 'getStagiaireDetailsByEncadrant']);
    Route::post('/projets', [ProjetController::class, 'store']);
    Route::get('/projets/{id}', [ProjetController::class, 'show']);
    Route::put('/projets/{id}', [ProjetController::class, 'update']);
    Route::delete('/projets/{id}', [ProjetController::class, 'destroy']);
    Route::get('/rapports/projet/{projet_id}', [RapportController::class, 'getRapportByProjet']);
    Route::post('/rapports/{rapport}/evaluate', [RapportController::class, 'evaluate']); // Évaluer un rapport
    Route::get('/rapports/{encadrant_id}/{stagiaire_id}/get-rapport-id', [RapportController::class, 'getRapportId']);



});
//Route::middleware('auth:sanctum')->post('/projets', [ProjetController::class, 'store']);



require __DIR__.'/auth.php';
