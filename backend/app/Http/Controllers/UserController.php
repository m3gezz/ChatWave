<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

use function Pest\Laravel\json;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = User::where('admin', false)->get();

        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        Gate::authorize('update', $user);

        if ($user->admin) {
            $data = ['message' => 'Not found'];
            return response()->json($data, 404);
        }

        return response()->json($user, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        Gate::authorize('update', $user);

        $fields = $request->validate([
            'avatar' => 'sometimes|required|string',
            'username' => 'sometimes|required|string|min:3|max:20|unique:users,username',
            'email' => 'sometimes|required|email|unique:users,email',
            'old_password' => 'sometimes|required|string|min:5|max:255',
            'new_password' => 'sometimes|required|string|min:5|max:255|confirmed',
        ]);

        if ($request->has('old_password') || $request->has('new_password')) {
            if (!$request->filled('old_password') || !$request->filled('new_password')) {
                $data = [
                    'message' => 'Both password fields are required'
                ];

                return response()->json($data, 422);
            }

            if (!Hash::check($fields['old_password'], $user->password)) {
                $data = [
                    "message"=> "The selected password is invalid.",
                    "errors"=> [
                        "old_password"=> [
                            "The old password is incorrect."
                        ]
                    ]
                ];
                return response()->json($data, 422);
            }

            $user->password = Hash::make($fields['new_password']);
            $user->save();
            return response()->json($user, 200);
        }

        $user->update($fields);
        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        Gate::authorize('update', $user);

        $user->tokens()->delete();
        $user->delete();
        $data = [
            'message' => 'Deleted successfully'
        ];

        return response()->json($data, 200);
    }
}
