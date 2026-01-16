<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LandingController extends Controller
{
    public function homecarshop()
    {
        return view('landers.scratchrepair');
    }

    public function divinecareshop()
    {
        return view('landers.nailrepair');
    }

    public function nailrepair()
    {
        return view('landers.nailrepair');
    }

    public function scratchrepair()
    {
        return view('landers.scratchrepair');
    }

    public function pestreject()
    {
        return view('landers.pestreject');
    }

    public function pestrejectbih()
    {
        return view('landers.pestrejectbih');
    }
}
