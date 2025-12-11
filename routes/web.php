<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return 'Hello World';
});

Route::view('/nailrepair', 'landers.nailrepair');

Route::post('/order', [App\Http\Controllers\OrderController::class, 'store'])->name('order.create');
