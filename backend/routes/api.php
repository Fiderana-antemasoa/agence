<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;

Route::apiResource('clients', ClientController::class);
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
