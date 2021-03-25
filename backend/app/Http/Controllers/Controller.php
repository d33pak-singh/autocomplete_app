<?php

/**
 * Controller
 *
 * PHP version 7
 *
 * @category Autocomplete-Schoology
 * @package  Autocomplete-Schoology
 * @author   Deepak Kumar Singh <singhdeepakk1992@gmail.com>
*/

namespace App\Http\Controllers;

use App\Constants\ValueConstant;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $code, $message;

    public function __construct()
    {
        // Setting up the default response keys
        $this->code = ValueConstant::$generalConstant['CODEKEY'];
        $this->message = ValueConstant::$generalConstant['MESSAGEKEY'];
    }
}
