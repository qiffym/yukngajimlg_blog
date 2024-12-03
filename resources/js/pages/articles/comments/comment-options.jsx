import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconDotsVertical, IconHighlight, IconTrash, IconTriangleInfoFill } from '@irsyadadl/paranoid';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import { CommentForm } from '@/pages/articles/comments/comment-form';
import { useState } from 'react';
import { AlertAction } from '@/components/alert-action';

export function CommentOptions({ comment, article }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const [attributes, setAttributes] = useState({
        body: '',
        url: '',
        method: 'put',
        item: {},
        submitText: '',
    });

    const handleEdit = (e) => {
        e.preventDefault();
        setOpen(true);
        setAttributes({
            ...attributes,
            body: comment.body,
            url: route('comments.update', [article, comment]),
            method: 'put',
            submitText: 'Update Comment',
        });
    };

    const handleDelete = (article, comment) => {
        router.delete(route('comments.destroy', [article, comment]), { preserveScroll: true });
    };

    const handleReport = (comment) => {
        router.put(route('comments.report', [comment]), {}, { preserveScroll: true });
    };

    return (
        <>
            <div className="absolute right-0">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className={cn(
                            buttonVariants({ size: 'icon', variant: 'ghost' }),
                            'h-8 w-6 text-muted-foreground',
                        )}
                    >
                        <IconDotsVertical className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        {comment.user.id !== auth.user.id && (
                            <AlertAction
                                trigger={
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <IconTriangleInfoFill className="mr-2 size-4" />
                                        Report
                                    </DropdownMenuItem>
                                }
                                action={() => handleReport(comment)}
                                title="Report Comment"
                                description="Are you sure you want to report this comment?"
                            />
                        )}
                        {comment.user.id === auth.user.id && (
                            <DropdownMenuGroup>
                                <DropdownMenuItem onSelect={handleEdit}>
                                    <IconHighlight className="mr-2 size-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <AlertAction
                                    trigger={
                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                            <IconTrash className="mr-2 size-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    }
                                    action={() => handleDelete(article, comment)}
                                    title="Delete Comment"
                                    description="Are you sure you want to delete this comment?"
                                />
                            </DropdownMenuGroup>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {comment.user.id === auth.user.id && <CommentForm {...{ auth, open, setOpen, attributes }} />}
        </>
    );
}
