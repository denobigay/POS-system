<?php

use App\Http\Controllers\Api\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(RoleController::class)->group(function () {
    Route::post('/storeRole', 'storeRole');
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
