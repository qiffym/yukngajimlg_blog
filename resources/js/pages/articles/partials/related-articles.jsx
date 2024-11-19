import { Link, usePage } from '@inertiajs/react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { limitChars } from '@/lib/utils.js';


export function RelatedArticles() {
    const { articles } = usePage().props;
    return articles.length > 0 ? (
        <div>
            <h3 className="mb-4 text-lg font-semibold tracking-tight">Related Articles</h3>
            <div className="-mx-4 space-y-2">
                {articles.map((article, i) => (
                    <CardHeader
                        key={i}
                        className="rounded-lg border border-transparent p-4 duration-200 hover:border-border hover:bg-secondary/10"
                    >
                        <CardTitle className="text-base">
                            <Link href={route('articles.show', [article])}>{article.title}</Link>
                        </CardTitle>
                        <CardDescription>{limitChars(article.teaser, 80)}</CardDescription>
                    </CardHeader>
                ))}
            </div>
        </div>
    ) : null;
}
