<?php

namespace App\Constants;

/**
 * ErrorConstant
 * This class contain all the error codes and message for the projects
 * PHP version 7
 *
 * @category Autocomplete-Schoology
 * @package  App\Constants
 * @author   Deepak Kumar Singh <singhdeepakk1992@gmail.com>
*/

final class ErrorConstant
{
    const KEY_MESSAGE = 'message';
    const KEY_CODE    = 'code';

    public static $responseErrorCodes = array(
      'INVALIDREQUEST' => array(self::KEY_CODE => 1000, self::KEY_MESSAGE => 'Invalid request content'),
      'INVALIDSEARCHQUERY' => array(self::KEY_CODE => 1001, self::KEY_MESSAGE => 'Invalid search query'),
      'SOMETHINGWENTWRONG' => array(self::KEY_CODE => 1002, self::KEY_MESSAGE => 'Something went wrong'),
    );
}
