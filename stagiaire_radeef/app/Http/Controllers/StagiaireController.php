<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\StagiaireResource;
use App\Http\Requests\StoreStagiaireRequest;
use App\Http\Requests\UpdateStagiaireRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
class StagiaireController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return StagiaireResource::collection(User::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreStagiaireRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStagiaireRequest $request)
    {
        $formFields = $request->validated();
        $formFields['password'] = Hash::make($formFields['password']);
        $stagiaire = User::create($formFields);
        $response = new StagiaireResource($stagiaire);
        return response()->json([
            'stagiaire' => $response,
            'message' => 'stagiaire created successfuly',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User $stagiaire
     * @return \Illuminate\Http\Response
     */
    public function show(User $stagiaire)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateStagiaireRequest  $request
     * @param  \App\Models\User  $stagiaire
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStagiaireRequest $request, User $stagiaire)
    {
        $formFields = $request->validated();
        $formFields['password'] = Hash::make($formFields['password']);
        $stagiaire->update($formFields);
        return response()->json([
            'stagiaire' => new StagiaireResource($stagiaire),
            'message' => 'stagiaire updated successfuly',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $stagiaire
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $stagiaire)
    {
        $stagiaire->delete();
        return new StagiaireResource($stagiaire);
    }
}
