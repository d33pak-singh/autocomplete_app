<?php

use App\Model\People;
use Illuminate\Database\Seeder;

class PeopleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      // create 100 records in db using factory
      factory(People::class, 100)->create();
    }
}
