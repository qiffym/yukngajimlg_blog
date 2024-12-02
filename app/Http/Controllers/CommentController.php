<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;

class CommentController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            'auth'
        ];
    }

    public function store(Request $request, Article $article)
    {
        $request->validate([
            'body' => ['required', 'string', 'min:3']
        ]);

        $request->user()->comments()->create([
            'body' => $request->body,
            'article_id' => $article->id
        ]);

        return back();
    }
}
