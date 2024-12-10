import { InputErrorMessage } from '@/components/input-error-message';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export function UpdatePasswordForm() {
    const passwordInput = useRef(null);
    const currentPasswordInput = useRef(null);
    const { data, setData, put, errors, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Password</CardTitle>
                <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="current_password">Current Password</Label>
                        <Input
                            className="mt-1"
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            autoComplete="current-password"
                            required
                        />
                        <InputErrorMessage message={errors.current_password} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            className="mt-1"
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            autoComplete="new-password"
                            required
                        />
                        <InputErrorMessage message={errors.password} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                            className="mt-1"
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type="password"
                            autoComplete="new_password"
                            required
                        />

                        <InputErrorMessage message={errors.password_confirmation} className="mt-2" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Save</Button>
                        {recentlySuccessful && <p className="text-sm text-muted-foreground">Saved.</p>}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
