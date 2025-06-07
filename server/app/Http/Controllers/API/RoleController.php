<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function loadRoles()
    {
        $roles = Role::all();
        return response()->json([
            'roles' => $roles,

        ], 200);
    }

    public function storeRole(Request $request)
    {
        $validated = $request->validate([
            'roleName' => ['required', 'min: 4', 'max: 50'],
            'roleDesc' => ['nullable', 'max:255'], // ALLOW description
        ]);

        Role::create([
            'role_name' => $validated['roleName'],
            'description' => $validated['roleDesc']
        ]);

        return response()->json([
            'message' => 'Role created successfully',

        ], 200);
    }
}
