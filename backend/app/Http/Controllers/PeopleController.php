<?php

/**
 * PeopleController
 *
 * PHP version 7
 *
 * @category Autocomplete-Schoology
 * @package  App\Http\Controllers
 * @author   Deepak Kumar Singh <singhdeepakk1992@gmail.com>
*/

namespace App\Http\Controllers;

// Composer
use Illuminate\Http\Request;

// Constants
use App\Constants\ResponseConstant;
use App\Constants\RequestKeyConstant;

// Services
use App\Services\PeopleService;
use App\Services\ValidateService;
use App\Services\ApiRequestService;

class PeopleController extends Controller
{
    /**
     * get the data of all users based on searched query
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $requestContent = $request->all();

        // Validating request content
        ValidateService::validateRequest($requestContent, RequestKeyConstant::$v1['SEARCHPEOPLEREQUEST']);

        // Get result based on search query
        $searchResult = array('result' => (new PeopleService())->getSearchResult($requestContent['query']));

        // Getting success response value
        $responseConstant = ResponseConstant::$v1Success['SEARCHPEOPLERESPONSE'];

        // Generating success response
        $returnData = ApiRequestService::standardSuccessResponse(
            $responseConstant[$this->code],
            $responseConstant[$this->message]
        );

        return $returnData = array_merge($returnData, $searchResult);
    }
}
