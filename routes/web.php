<?php

use Illuminate\Support\Facades\Route;


Route::post('/order', [App\Http\Controllers\OrderController::class, 'store'])->name('order.create');

Route::view('/', 'landers.nailrepair');
Route::view('/nailrepair', 'landers.nailrepair');
