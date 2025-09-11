<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    public function index()
    {
        return response()->json(Offer::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|string|max:50',
            'status' => 'required|string|in:active,pending',
            'category' => 'required|string|in:web,seo,marketing,design,consulting',
            'clientsCount' => 'integer|min:0',
            'validUntil' => 'nullable|date',
        ]);

        $offer = Offer::create($validated);
        return response()->json($offer, 201);
    }

    public function show(Offer $offer)
    {
        return response()->json($offer);
    }

    public function update(Request $request, Offer $offer)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|string|max:50',
            'status' => 'required|string|in:active,pending',
            'category' => 'required|string|in:web,seo,marketing,design,consulting',
            'clientsCount' => 'integer|min:0',
            'validUntil' => 'nullable|date',
        ]);

        $offer->update($validated);
        return response()->json($offer);
    }

    public function destroy(Offer $offer)
    {
        $offer->delete();
        return response()->json(null, 204);
    }
}

