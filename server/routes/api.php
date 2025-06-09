<?php

use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(RoleController::class)->group(function () {
    Route::get('/loadRoles', 'loadRoles');
    Route::post('/storeRole', 'storeRole');
    Route::put('/updateRole/{id}', 'updateRole');
    Route::delete('/deleteRole/{id}', 'deleteRole');
});

Route::controller(UserController::class)->group(function () {
    Route::get('/loadUsers', 'loadUsers');
    Route::post('/storeUser', 'storeUser');
    Route::put('/updateUser/{id}', 'updateUser');
    Route::delete('/deleteUser/{id}', 'deleteUser');
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
