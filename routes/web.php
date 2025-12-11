<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/nailrepair');

Route::view('/nailrepair', 'landers.nailrepair');

Route::post('/order', [App\Http\Controllers\OrderController::class, 'store'])->name('order.create');
