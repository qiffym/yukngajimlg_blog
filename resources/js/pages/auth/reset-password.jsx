import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GuestLayout } from '@/layouts/guest-layout';
import { AuthenticatedCard } from '@/components/authenticated-card';
import { InputErrorMessage } from '@/components/input-error-message';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: ''
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    const onChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    return (
        <>
            <Head title="Reset Password" />
            <AuthenticatedCard title="Reset Password" description="Enter your new password below">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input className="mt-1"
                               type="email" id="email" name="email"
                               value={data.email}
                               onChange={onChange}
                               autoComplete="username"
                        />
                        <InputErrorMessage className="mt-2" message={errors.email} />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input className="mt-1"
                               type="password" id="password" name="password"
                               value={data.password}
                               onChange={onChange}
                               autoComplete="new-password"
                               autoFocus
                        />
                        <InputErrorMessage className="mt-2" message={errors.password} />
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation">Password Confirmation</Label>
                        <Input className="mt-1"
                               type="password" id="password_confirmation" name="password_confirmation"
                               value={data.password_confirmation}
                               onChange={onChange}
                               autoComplete="new-password"
                        />
                        <InputErrorMessage className="mt-2" message={errors.password_confirmation} />
                    </div>

                    <div className="flex items-center justify-center">
                        <Button variant="outline" asChild>
                            <Link href="/login">Cancel</Link>
                        </Button>
                        <Button className="ml-4" type="submit" disabled={processing}>
                            Reset Password
                        </Button>
                    </div>
                </form>
            </AuthenticatedCard>
        </>
    );
}

ResetPassword.layout = (page) => <GuestLayout children={page} />;
