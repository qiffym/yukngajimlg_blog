<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        collect(['Ilmu Hadits', 'Perbankan Syariah', 'Teknologi dalam Islam', 'Hubungan Antarumat Beragama', 'Gaya Hidup Islami', 'Psikologi Islam', 'Pendidikan Anak dalam Islam', ' Pemikiran Ulama Klasik dan Kontemporer', 'Metode Dakwah', 'Etika Bisnis dalam Islam', 'Kepemimpinan dalam Islam', 'Amalan Sunnah', 'Keajaiban Al-Quran', 'Hukum Islam Internasional', 'Bahasa Arab dan Islam', 'Pengelolaan Keuangan Pribadi dalam Islam'])
            ->each(fn($tag) => Tag::create([
                'name' => $tag,
                'slug' => str($tag)->slug(),
            ]));
    }
}
