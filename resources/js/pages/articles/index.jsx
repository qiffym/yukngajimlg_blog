import { AppLayout } from "@/layouts/app-layout";
import { Container } from "@/components/container";
import { Head } from "@inertiajs/react";
import { ArticleCard } from "@/pages/articles/partials/article-card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

export default function Index(props) {
    const { data: articles, meta } = props.articles;
    return (
        <>
            <Head title="Articles" />
            <Container>
                {articles.length > 0 ? (
                    <div className="grid gap-y-16 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
                        {articles.map((article, index) => (
                            <ArticleCard key={index} article={article} />
                        ))}
                    </div>
                ) : (
                    <p>No articles found.</p>
                )}
            </Container>
            {meta.has_pages && (
                <Pagination className="mt-8 sm:mt-16">
                    <PaginationContent>
                        <PaginationItem>
                            {meta.links.map((link, index) => (
                                <PaginationLink key={index} href={link.url} isActive={link.active} size={'default'}>
                                    {link.label}
                                </PaginationLink>
                            ))}
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
}

Index.layout = (page) => <AppLayout children={page} />;
