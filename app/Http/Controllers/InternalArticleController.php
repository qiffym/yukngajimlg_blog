<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Http\Resources\ArticleListResource;
use App\Models\Article;
use Coderflex\Laravisit\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class InternalArticleController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware(middleware: ['auth']),
            new Middleware(
                middleware: ['role:admin'],
                only: ['destroy', 'approve']
            ),
        ];
    }

    public function index(Request $request)
    {
        $totalVisits = Visit::query()->where('visitable_type', Article::class)->count();
        $articles = ArticleListResource::collection(
            $self = Article::query()->select(['id', 'user_id', 'category_id', 'title', 'slug', 'published_at', 'created_at', 'status'])
                ->with(['user:id,name', 'category:id,name,slug', 'tags:id,name,slug'])
                ->withTotalVisitCount()
                ->when(!$request->user()->hasRole('admin'), fn($query) => $query->whereBelongsTo($request->user()))
                ->latest()
                ->paginate(10)
        )->additional([
            'meta' => [
                'has_pages' => $self->hasPages(),
                'total_visits' => $totalVisits,
                'unpublished_count' => Article::query()
                    ->whereNot('status', ArticleStatus::Published)
                    ->when(!$request->user()->hasRole('admin'), fn($query) => $query->whereBelongsTo($request->user()))
                    ->count(),
            ],
        ]);

        return inertia('articles/list', [
            'articles' => $articles
        ]);
    }
}
