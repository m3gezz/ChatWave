<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;

use App\Models\User;

use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

//Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


//Email verification
Route::post('/email/verification-notification', function (Request $request) {
    if ($request->user()->hasVerifiedEmail()) {
        return response()->json(['message' => 'Already verified refresh the page']);
    }
    
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['message' => 'Verification link sent!']);
})->middleware('auth:sanctum');


Route::get('/email/verify/{id}/{hash}', function ($id, $hash) {
    $user = User::findOrFail($id);
    
    if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        abort(403);
    }
    
    if (! $user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
        event(new Verified($user));
    }
    
    return redirect(env('FRONTEND_URL') . '/user');
})->middleware('signed')->name('verification.verify');

//Password reset
Route::post('/forgot-password', function (Request $request) {
    $fields = $request->validate(['email' => 'required|email']);
    
    $status = Password::sendResetLink($fields);
    
    return $status === Password::RESET_LINK_SENT
    ? response()->json(['message' => __($status)])
    : response()->json(['errors' => __($status)], 400);
});

Route::post('/reset-password', function (Request $request) {
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|string|min:5|max:255|confirmed',
    ]);
    
    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password)
                ])->save();
                
                $user->setRememberToken(Str::random(60));
            }
        );
        
        return $status === Password::PASSWORD_RESET
        ? response()->json(['message' => __($status)])
        : response()->json(['message' => __($status)], 400);
    });
    
    
//Users
Route::apiResource('/users', UserController::class)->middleware('auth:sanctum');

//Conversations
Route::apiResource('/conversations', ConversationController::class)->middleware('auth:sanctum');

//Messages
Route::post('/messages', [MessageController::class, 'store'])->middleware('auth:sanctum');
Route::get('/conversations/{id}/messages', [MessageController::class, 'index'])->middleware('auth:sanctum');