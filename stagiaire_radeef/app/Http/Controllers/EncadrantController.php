<?php

namespace App\Http\Controllers;

use App\Models\Encadrant;
use App\Http\Resources\EncadrantResource;
use App\Http\Requests\StoreEncadrantRequest;
use App\Http\Requests\UpdateEncadrantRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
class EncadrantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return EncadrantResource::collection(Encadrant::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreEncadrantRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEncadrantRequest $request)
    {
        $formFields = $request->validated();
        $formFields['password'] = Hash::make($formFields['password']);
        $encadrant = Encadrant::create($formFields);
        $response = new EncadrantResource($encadrant);
        return response()->json([
            'encadrant' => $response,
            'message' => 'Encadrant created successfuly',
        ]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Encadrant  $encadrant
     * @return \Illuminate\Http\Response
     */
    public function show(Encadrant $encadrant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateEncadrantRequest  $request
     * @param  \App\Models\Encadrant  $encadrant
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEncadrantRequest $request, Encadrant $encadrant)
    {
        $formFields = $request->validated();
        $formFields['password'] = Hash::make($formFields['password']);
        $encadrant->update($formFields);
        return response()->json([
            'encadrant' => new EncadrantResource($encadrant),
            'message' => 'Encadrant updated successfuly',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Encadrant  $encadrant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Encadrant $encadrant)
    {
        $encadrant->delete();
        return new EncadrantResource($encadrant);
    }
}
