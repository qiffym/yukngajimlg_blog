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
import { usePage } from '@inertiajs/react';
import { CommentForm } from '@/pages/articles/comments/comment-form';
import { useState } from 'react';

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

    const handleDelete = (e) => {
        e.preventDefault();
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
                            <DropdownMenuItem>
                                <IconTriangleInfoFill className="mr-2 size-4" />
                                Report
                            </DropdownMenuItem>
                        )}
                        {comment.user.id === auth.user.id && (
                            <DropdownMenuGroup>
                                <DropdownMenuItem onSelect={handleEdit}>
                                    <IconHighlight className="mr-2 size-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onSelect={handleDelete}>
                                    <IconTrash className="mr-2 size-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {comment.user.id === auth.user.id && <CommentForm {...{ auth, open, setOpen, attributes }} />}
        </>
    );
}
