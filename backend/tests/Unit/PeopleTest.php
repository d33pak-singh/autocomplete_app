<?php

/**
 * PeopleTest
 * This is a test class for People endpoint
 * PHP version 7
 *
 * @category Autocomplete-Schoology
 * @package  Tests\Unit
 * @author   Deepak Kumar Singh <singhdeepakk1992@gmail.com>
*/

namespace Tests\Unit;

// Model
use App\Model\People;

// Constants
use App\Constants\ErrorConstant;

// Composer
use Faker\Factory as Faker;
use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\Exception\RequestException as GuzzleException;

class PeopleTest extends TestCase
{
    private $client;
    private $endpoint;

    public function __construct()
    {
        parent::__construct();

        // Setting up the client and endpoint
        $this->client = new GuzzleClient();
        $this->endpoint = 'http://127.0.0.1:' . env('BACKEND_PORT', '8000');
    }

    /**
     * Function to check if user is trying to call a invalid endpoint
     *
     * @assert boolean
     */
    public function test_for_a_invalid_endpoint()
    {
        try {
            // calling a random url
            $path = $this->endpoint.'/api/v1/random_uri';
            $res = $this->client->request('GET', $path);
            if ($res->getStatusCode() === 200) {
                $this->assertTrue(false);
            }
        } catch (GuzzleException $e) {
            $response = json_decode($e->getResponse()->getBody()->getContents(), true);

            $apiResponseConstants = ErrorConstant::$responseErrorCodes['SOMETHINGWENTWRONG'];

            // chekcing if got someting wrong error code from the api response
            $this->assertEquals($apiResponseConstants[ErrorConstant::KEY_CODE], $response['exception']['reasonCode']);
            $this->assertEquals($apiResponseConstants[ErrorConstant::KEY_MESSAGE], $response['exception']['reasonMessage']);
        }
    }

    /**
     * Function to check if user fired the api without passing any query param
     *
     * @assert boolean
     */
    public function test_not_passed_query_in_search()
    {
        try {
          // calling the api without passing any search query
            $path = $this->endpoint.'/api/v1/people?query=';
            $res = $this->client->request('GET', $path);
            if ($res->getStatusCode() === 200) {
                $this->assertTrue(false);
            }
        } catch (GuzzleException $e) {
            $response = json_decode($e->getResponse()->getBody()->getContents(), true);
        
            $apiResponseConstants = ErrorConstant::$responseErrorCodes['INVALIDSEARCHQUERY'];

          // chekcing if got INVALIDSEARCHQUERY from the api response
            $this->assertEquals($apiResponseConstants[ErrorConstant::KEY_CODE], $response['exception']['reasonCode']);
            $this->assertEquals($apiResponseConstants[ErrorConstant::KEY_MESSAGE], $response['exception']['reasonMessage']);
        }
    }

    /**
     * Function to check if user search for any query which is present in db we get a 200 response or not
     *
     * @assert boolean
     */
    public function test_query_in_search()
    {
      // create a fake name and insert in db
        $faker = Faker::create();
        $name = $faker->name;
        People::create(['name' => $name]);

        $client = new GuzzleClient();
        try {
            // search for the fake name that was just inserted
            $path = $this->endpoint.'/api/v1/people?query='.$name;
            $res = $this->client->request('GET', $path);

            if ($res->getStatusCode() === 200) {
              // if we get a 200 response it means api works
                $this->assertTrue(true);
            } else {
                $this->assertTrue(false);
            }
        } catch (GuzzleException $e) {
            $this->assertTrue(false);
        }
    }
}
