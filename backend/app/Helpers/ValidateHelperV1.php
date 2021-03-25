<?php
/**
 * ValidateHelperV1
 * This class will provide us any helper method needed to validate request/response data
 * PHP version 7
 *
 * @category Autocomplete-Schoology
 * @package  App\Helpers
 * @author   Deepak Kumar Singh <singhdeepakk1992@gmail.com>
*/

namespace App\Helpers;

// Constants
use App\Constants\ValueConstant;
use App\Constants\RequestKeyConstant;

class ValidateHelperV1
{
    /**
     * Function to validate general strings content
     *
     * @param $key
     * @return bool
     */
    public static function validateSearchQuery(&$string)
    {
        if (empty(trim(self::sanitize($string)))) {
            return false;
        }

        return true;
    }

    /**
     * Function to sanitize string from XSS attack
     *
     * @param $string
     * @return mixed
     */
    public static function sanitize($string)
    {
        return filter_var($string, FILTER_SANITIZE_STRING);
    }
}
