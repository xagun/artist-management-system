<?php

use App\Http\Controllers\ArtistController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::controller(UserController::class)->group(function (){
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
});


Route::middleware('auth:sanctum')->group(function(){
    Route::get('/artist', [ArtistController::class, 'index']);
    Route::post('/artist', [ArtistController::class, 'store']);
    Route::post('/artist/update/{id}', [ArtistController::class, 'update']);
    Route::delete('/artist/delete/{id}', [ArtistController::class, 'destroy']);
});
