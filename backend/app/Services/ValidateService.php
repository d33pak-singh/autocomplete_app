<?php
/**
 * ValidateService
 * This class will contain all the validation function for the project
 * PHP version 7
 *
 * @category Autocomplete-Schoology
 * @package  App\Services
 * @author   Deepak Kumar Singh <singhdeepakk1992@gmail.com>
*/

namespace App\Services;

// Constants
use App\Constants\ValueConstant;
use App\Constants\ValidationConstant;

// Helpers
use App\Helpers\ValidateHelperV1 as ValidateHelper;

// Composer
use Dotenv\Exception\ValidationException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ValidateService
{
    /**
     * Function to validate request key and values
     *
     * @param $content
     * @param $requestKeyArray
     * @return array
     */
    public static function validateRequest(&$content, $requestKeyArray)
    {

        // Validate request required key
        if (count(array_diff($requestKeyArray, array_keys($content)))) {
            throw new BadRequestHttpException('INVALIDREQUEST', null, 400);
        }

        // Validate request content
        foreach (array_keys($content) as $key) {
            $validation = ValidationConstant::$validationRuleMessage[strtoupper($key)];
            if (!ValidateHelper::{$validation['validationHelperName']}($content[$key])) {
                throw new ValidationException($validation['errorMessageKey'], 406);
            }
        }

        return array('status' => true);
    }
}
