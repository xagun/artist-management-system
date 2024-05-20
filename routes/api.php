<?php

use App\Http\Controllers\ArtistController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::controller(UserController::class)->group(function (){
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
});


Route::middleware('auth:sanctum')->group(function(){
    //artists routes
    Route::get('/artist', [ArtistController::class, 'index']);
    Route::post('/artist', [ArtistController::class, 'store']);
    Route::post('/artist/update/{id}', [ArtistController::class, 'update']);
    Route::delete('/artist/delete/{id}', [ArtistController::class, 'destroy']);

    // music routes
    Route::get('/music', [MusicController::class, 'index']);
    Route::post('/music', [MusicController::class, 'store']);
    Route::get('/music/{id}', [MusicController::class, 'getMusicById']);
    Route::get('/artist-music/{id}', [MusicController::class, 'getMusicByArtist']);
    Route::post('/music/update/{id}', [MusicController::class, 'update']);
    Route::delete('/music/delete/{id}', [MusicController::class, 'destroy']);


});

