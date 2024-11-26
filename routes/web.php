<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', Controllers\HomeController::class)->name('home');
Route::get('/dashboard', Controllers\DashboardController::class)->middleware(['auth'])->name('dashboard');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('articles/tags/{tag:slug}', [Controllers\TagController::class, 'show'])->name('tags.show');
Route::get('articles/categories/{category:slug}', [Controllers\CategoryController::class, 'show'])->name('categories.show');

Route::get('articles/{article:slug}', [Controllers\ArticleController::class, 'show'])
    ->name('articles.show')
    ->where('article', '^(?!latest|trending|most-likes|year|month|week|all-time)[a-z0-9-]+$');

Route::get('articles/{key?}', [Controllers\ArticleController::class, 'index'])
    ->name('articles.index');

require __DIR__ . '/auth.php';
