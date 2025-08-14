<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['status' => 'api ready'];
});

Route::get('/reset-password/{token}', function ($token) {
    $email = request('email');
    return redirect(env('FRONTEND_URL') . "/guest/reset-password?token={$token}&email={$email}");
})->name('password.reset');