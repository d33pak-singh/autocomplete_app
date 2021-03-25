<?php

/**
 * GeneralHelper
 *
 * PHP version 7
 * Helper class for miscellaneous usage
 * @category Autocomplete-Schoology
 * @package  App\Helpers
 * @author   Deepak Kumar Singh <singhdeepakk1992@gmail.com>
*/

namespace App\Helpers;

use Exception;
use App\Constants\ErrorConstant;
use App\Services\ApiRequestService;

class GeneralHelper
{
    /**
     * Function to return the message from Error constant if found else return the thrown message
     *
     * @param $message
     * @return array
     */
    public function getReturnMessage(Exception $message)
    {
        if (array_key_exists($message->getMessage(), ErrorConstant::$responseErrorCodes)) {
            return ApiRequestService::standardErrorResponse($message->getMessage());
        }

        return ApiRequestService::standardErrorResponse('SOMETHINGWENTWRONG');
    }
}
