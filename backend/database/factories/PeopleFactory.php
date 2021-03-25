<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\People;
use Faker\Generator as Faker;

$factory->define(People::class, function (Faker $faker) {
    return [
      'name' => $faker->name
    ];
});
