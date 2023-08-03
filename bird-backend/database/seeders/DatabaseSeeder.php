<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Tweet;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Rihards',
            'email' => 'rihards@rihards.com',
        ]);

        User::factory(100)
          ->sequence(fn ($sequence) => ['name' => 'Person '. $sequence->index + 2])
          ->create();

        foreach (range(0, 80, 20) as $userGroup) {
            foreach (range($userGroup + 1, $userGroup + 20) as $user_id) {
                Tweet::factory()->create(['user_id' => $user_id]);
                foreach (range($userGroup + 1, $userGroup + 20) as $following_user_id) {
                    User::find($user_id)->follows()->attach($following_user_id);
                }
            }
        }
        //Tweet::factory(40)->create();
    }
}
