import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GuestLayout } from '@/layouts/guest-layout';
import { InputErrorMessage } from '@/components/input-error-message';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'));
    };

    return (
        <>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-muted-foreground">
                This is a secure area of the application. Please confirm your password before continuing.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        className="mt-1 block w-full"
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoFocus
                    />
                    <InputErrorMessage className="mt-2" message={errors.password} />
                </div>

                <div className="mt-4 items-center justify-end">
                    <Button className="ml-4" disabled={processing}>
                        Confirm
                    </Button>
                </div>
            </form>
        </>
    );
}

ConfirmPassword.layout = (page) => <GuestLayout children={page} />;
