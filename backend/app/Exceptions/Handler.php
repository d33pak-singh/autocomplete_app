<?php

/**
 * Handler
 *
 * PHP version 7
 * This is a laravel genertaed class which handles all expection cases
 * @category Autocomplete-Schoology
 * @package  App\Exceptions
 * @author   Deepak Kumar Singh <singhdeepakk1992@gmail.com>
*/

namespace App\Exceptions;

use Exception;
use App\Helpers\GeneralHelper;
use Illuminate\Support\Facades\Response;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        // Create Response for errors.
        $code = $exception->getCode() ? $exception->getCode() : 503;

        return Response::json((new GeneralHelper)->getReturnMessage($exception), $code);
    }
}
