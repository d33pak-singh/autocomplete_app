<?php

/**
 * People
 * People model class to be used for all db operation where people table is involved
 * PHP version 7
 *
 * @category Autocomplete-Schoology
 * @package  App\Model
 * @author   Deepak Kumar Singh <singhdeepakk1992@gmail.com>
*/

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class People extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
    protected $fillable = [
    'name'
    ];

  /**
   * get records from the tabel based on the query passed in search param
   * @param [string] $[query] [<search query entered by user>]
   * @return \Illuminate\Database\Eloquent\Builder
  */

    public static function getAllPeople($query)
    {
      // using fulltext index search of mysql to match result based on queries
      // Fulltext will provide better optimised result than using LIKE
        return static::select('id', 'name')
        ->whereRaw("MATCH(name) AGAINST(? IN BOOLEAN MODE)", array("$query*"))->get();
    }
}
