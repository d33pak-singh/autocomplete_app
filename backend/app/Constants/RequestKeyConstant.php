<?php

/**
 * RequestKeyConstant
 * This class will maintain an array of parameters we are expecting for a particular endpoint
 * PHP version 7
 *
 * @category Autocomplete-Schoology
 * @package  App\Constants
 * @author   Deepak Kumar Singh <singhdeepakk1992@gmail.com>
*/

namespace App\Constants;

final class RequestKeyConstant
{
    public static $v1 = array(
    'SEARCHPEOPLEREQUEST' => array('query'),
    );
}
