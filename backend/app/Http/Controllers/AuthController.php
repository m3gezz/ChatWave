<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required|string|min:3|max:20|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:5|max:255|confirmed',
            'avatar' => 'sometimes|string',
            'admin' => 'sometimes|boolean',
        ]);

        $user = User::create($fields);  
        $token = $user->createToken($user->username)->plainTextToken;
        
        $data = [
            'user' => User::where('email', $user->email)->first(),
            'token' => $token,
        ];

        return response()->json($data, 200);
    }
    
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:5|max:255',
        ]);

        $user = User::where('email', $fields['email'])->first();
        
        if (!Hash::check($fields['password'], $user->password)) {
            $data = [
                "message"=> "The selected email is invalid.",
                "errors"=> [
                    "password"=> [
                        "The password is incorrect."
                    ]
                ]
            ];
            
            return response()->json($data, 422);
        }

        $token = $user->createToken($user->username)->plainTextToken;
        
        $data = [
            'user' => $user,
            'token' => $token,
        ];

        return response()->json($data, 200);
    }
    
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        $data = ['message' => 'Logged out successfully'];

        return response()->json($data, 200);
    }
}
