<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\OrderController;

Route::get('/', [LandingController::class, 'home'])->name('home');

Route::get('/nailrepair', [LandingController::class, 'nailrepair'])->name('nailrepair');

Route::post('/order', [OrderController::class, 'store'])->name('order.create');
