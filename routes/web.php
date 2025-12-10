<?php

use Illuminate\Support\Facades\Route;

//Route::get('/', function () {
//    return view('welcome');
//});

Route::post('/order', [App\Http\Controllers\OrderController::class, 'store'])->name('order.create');

Route::view('/nailrepair', 'landers.nailrepair');
