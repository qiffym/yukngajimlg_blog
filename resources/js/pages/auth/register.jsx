import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GuestLayout } from '@/layouts/guest-layout';
import { AuthenticatedCard } from '@/components/authenticated-card';
import { InputErrorMessage } from '@/components/input-error-message';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
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
        post(route('register'));
    };

    const onChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    return (
        <>
            <Head title="Register" />

            <AuthenticatedCard title="Create a new account" description="Or log in to your existing account">
                <form action={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input className="mt-1"
                               type="text" id="name" name="name"
                               value={data.name}
                               onChange={onChange}
                               autoComplete="name"
                               autoFocus
                               required
                        />
                        <InputErrorMessage className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input className="mt-1"
                               type="email" id="email" name="email"
                               value={data.email}
                               onChange={onChange}
                               autoComplete="username"
                               required
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
                               required
                        />
                        <InputErrorMessage className="mt-2" message={errors.password} />
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation">Password Confirmation</Label>
                        <Input className="mt-1"
                               type="password" id="password_confirmation" name="password_confirmation"
                               value={data.password_confirmation}
                               onChange={onChange}
                               required
                        />
                        <InputErrorMessage className="mt-2" message={errors.password_confirmation} />
                    </div>

                    <div className="flex items-center justify-between">
                        <Button variant="outline" asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button className="ml-4" type="submit" disabled={processing}>
                            Register
                        </Button>
                    </div>
                </form>
            </AuthenticatedCard>
        </>
    );
}

Register.layout = (page) => <GuestLayout children={page} />;
