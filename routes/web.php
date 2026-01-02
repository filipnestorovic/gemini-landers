<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\OrderController;

//Route::get('/', [LandingController::class, 'home'])->name('home');
//
//Route::get('/nailrepair', [LandingController::class, 'nailrepair'])->name('nailrepair');
//Route::get('/scratchrepair', [LandingController::class, 'scratchrepair'])->name('scratchrepair');
//
//Route::post('/order', [OrderController::class, 'store'])->name('order.create');


if (app()->environment('local')) {
    Route::get('/', [LandingController::class, 'homecarshop'])->name('homecarshop');
} else {
    Route::domain('auto.homecarshop.com')->group(function () {
        Route::get('/', [LandingController::class, 'homecarshop'])->name('homecarshop');
        Route::get('/scratchrepair', [LandingController::class, 'scratchrepair'])->name('scratchrepair');
    });

    Route::domain('medeiva.divinecareshop.com')->group(function () {
        Route::get('/', [LandingController::class, 'divinecareshop'])->name('divinecareshop');
        Route::get('/nailrepair', [LandingController::class, 'nailrepair'])->name('nailrepair');
    });
}

// Zajedničke rute za oba domena
Route::post('/order', [OrderController::class, 'store'])->name('order.create');
