<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        collect(['Aqidah', 'Fiqh', 'Sirah', "Tafsir Al-Qur'an", 'Hadits', 'Akhlak', 'Dakwah dan Tarbiyah', 'Ekonomi Syariah', 'Sejarah Islam', 'Pendidikan Islam', 'Keluarga dan Pernikahan', 'Politik dalam Islam', 'Perbandingan Agama'])
            ->each(fn($category) => Category::create([
                'name' => $category,
                'slug' => str($category)->slug(),
            ]));
    }
}
