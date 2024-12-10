import { Link, useForm, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputErrorMessage } from '@/components/input-error-message';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Transition } from '@headlessui/react';

export function UpdateProfileInformationForm({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        username: auth.user.username ?? '',
        name: auth.user.name ?? '',
        email: auth.user.email ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account's profile information and email address.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            className="mt-1"
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            autoComplete="name"
                            autoFocus
                            required
                        />
                        <InputErrorMessage message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            className="mt-1"
                            id="username"
                            type="text"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            autoComplete="username"
                            required
                        />
                        <InputErrorMessage message={errors.username} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            className="mt-1"
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            autoComplete="email"
                            required
                        />
                        <InputErrorMessage message={errors.email} className="mt-2" />
                    </div>

                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                        <div>
                            <p className="mt-2 text-sm">
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="text-muted-foreground underline hover:text-slate-900"
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Save</Button>
                        <Transition
                            show={recentlySuccessful}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out"
                        >
                            <p className="text muted-foreground text-sm">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
