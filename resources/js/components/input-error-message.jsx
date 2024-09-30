import { cn } from '@/lib/utils';

export function InputErrorMessage({className, message, ...props}) {
    return (
        <p {...props} className={cn("text-danger text-sm mt-1 first-letter:uppercase", className)}>
            {message}
        </p>
    );
}
