import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { GuestLayout } from '@/layouts/guest-layout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { InputErrorMessage } from '@/components/input-error-message';
import { AuthenticatedCard } from '@/components/authenticated-card';


export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />
            {status && <div className="mb-4 text-sm text-green-600 font-medium">{status}</div>}
            <AuthenticatedCard title="Log in to your account" description="Or create a new account">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            className="mt-1"
                            type="email" id="email" name="email"
                            value={data.email}
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputErrorMessage message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            className="mt-1"
                            type="password" id="password" name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputErrorMessage message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={(e) => setData('remember', e)}
                            />
                            <span className="ms-2 text-sm">Remember me</span>
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-muted-foreground transition duration-200 hover:text-foreground"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <Button variant="outline" asChild>
                            <Link href="/register">Register</Link>
                        </Button>
                        <Button className="ms-4" disabled={processing}>
                            Log in
                        </Button>
                    </div>
                </form>
            </AuthenticatedCard>
        </>
    );
}

Login.layout = (page) => <GuestLayout children={page} />;
