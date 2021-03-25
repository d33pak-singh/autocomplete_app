<?php

/**
 * ValidationConstant
 * This class will maintain an array of message for validation case based on the input name
 * PHP version 7
 *
 * @category Autocomplete-Schoology
 * @package  App\Constants
 * @author   Deepak Kumar Singh <singhdeepakk1992@gmail.com>
*/

namespace App\Constants;

final class ValidationConstant
{
    const HELPER_NAME_KEY   = 'validationHelperName';
    const ERROR_MESSAGE_KEY = 'errorMessageKey';

    public static $validationRuleMessage = array(
      'QUERY' => array( self::HELPER_NAME_KEY => 'validateSearchQuery', self::ERROR_MESSAGE_KEY => 'INVALIDSEARCHQUERY'),
    );
}
