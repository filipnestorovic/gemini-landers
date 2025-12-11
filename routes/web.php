<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    Route::view('/nailrepair', 'landers.nailrepair');
});

Route::post('/order', [App\Http\Controllers\OrderController::class, 'store'])->name('order.create');

Route::view('/nailrepair', 'landers.nailrepair');
