<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LandingController extends Controller
{
    public function home()
    {
        return 'Hello World';
    }

    public function nailrepair()
    {
        return view('landers.nailrepair');
    }
}
