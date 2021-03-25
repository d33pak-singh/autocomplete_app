<?php

/**
 * RequestKeyConstant
 * This class will maintain an array of response we will send for a particular endpoint call
 * PHP version 7
 *
 * @category Autocomplete-Schoology
 * @package  App\Constants
 * @author   Deepak Kumar Singh <singhdeepakk1992@gmail.com>
*/

namespace App\Constants;

final class ResponseConstant
{
    const KEY_MESSAGE = 'message';
    const KEY_CODE    = 'code';
    public static $v1Success = array(
    'SEARCHPEOPLERESPONSE' => array(self::KEY_CODE => '100', self::KEY_MESSAGE => 'Search result against the query'),
    );
}
