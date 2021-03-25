<?php

/**
 * PeopleService
 * This class contain all services for people model
 * PHP version 7
 *
 * @category Autocomplete-Schoology
 * @package  App\Services
 * @author   Deepak Kumar Singh <singhdeepakk1992@gmail.com>
*/

namespace App\Services;

// Model
use App\Model\People;

// Composer
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class PeopleService
{
    /**
     * Function to fetch people details based on the query passed
     *
     * @param $content
     * @return array
     */
    public function getSearchResult($content)
    {
        try {
            // Fetching people from db based on the search query
            $people = People::getAllPeople($content);
           
            return $people;
        } catch (\Exception $e) {
            throw new BadRequestHttpException('INVALIDSEARCHQUERY', null, 424);
        }
    }
}
