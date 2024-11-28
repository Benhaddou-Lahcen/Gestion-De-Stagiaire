<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         \App\Models\User::factory(10)->create();

         \App\Models\User::factory()->create([
             'firstname' => 'lahcen',
             'lastname' => 'benhaddou',
             'date_of_birth' => fake()->date(),
             'address' => fake()->address(),
             'email' => 'lahcen@benhaddou.com',
             'ecole' => 'ehtp',
             'password' => bcrypt('123456789')
         ]);
         \App\Models\Admin::factory()->create([
            'firstname' => 'admin',
            'lastname' => 'admin',
            'date_of_birth' => fake()->date(),
            'address' => fake()->address(),
            'phone' => substr(fake()->phoneNumber(),10),
            'email' => 'admin@admin.admin',
            'password' => bcrypt('123456789')
        ]);
        \App\Models\Encadrant::factory()->create([
            'firstname' => 'encadrant',
            'lastname' => 'encadrant',
            'date_of_birth' => fake()->date(),
            'address' => fake()->address(),
            'phone' => substr(fake()->phoneNumber(),10),
            'email' => 'encadrant@encadrant.encadrant',
            'departement' => 'Informatique',
            'password' => bcrypt('123456789')
        ]);
    }
}
