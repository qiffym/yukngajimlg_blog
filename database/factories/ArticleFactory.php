<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => rand(1, 13),
            'title' => $title = $this->faker->sentence,
            'slug' => str($title)->slug(),
            'teaser' => $this->faker->paragraph,
            'content' => $this->faker->paragraphs(4, true),
            'status' => $status = $this->faker->randomElement(['draft', 'pending', 'published']),
            'published_at' => $status === 'published' ? $this->faker->dateTimeBetween('-1 month', 'now') : null,
        ];
    }
}
