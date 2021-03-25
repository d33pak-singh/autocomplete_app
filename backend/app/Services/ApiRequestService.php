<?php

/**
 * People
 * Service class to genreate reponse code and messages for api calls
 * PHP version 7
 *
 * @category Autocomplete-Schoology
 * @package  App\Services
 * @author   Deepak Kumar Singh <singhdeepakk1992@gmail.com>
*/

namespace App\Services;

use App\Constants\ErrorConstant;

/**
 * This class handles all the error services for the project
 *
 * Class ApiRequestService
 * @package App\Services
 */
class ApiRequestService
{
    /**
     * Function to return error response with code and message
     *
     * @param $errorName
     * @return array
     */
    public static function standardErrorResponse($errorName)
    {
        // Getting error details from constant class.
        $errorDetails = ErrorConstant::$responseErrorCodes[$errorName];

        return array('exception' => array(
            'reasonCode'    => $errorDetails['code'],
            'reasonMessage' => $errorDetails['message']
        ));
    }

    // Generating success response
    public static function standardSuccessResponse($code = 0, $message = 'success')
    {
        return array(
            'response' => array(
                'responseCode'    => $code,
                'responseMessage' => $message
            )
        );
    }
}
