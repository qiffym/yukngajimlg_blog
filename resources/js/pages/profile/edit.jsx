import { AppLayout } from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { DeleteUserForm } from './partials/delete-user-form';
import { UpdatePasswordForm } from './partials/update-password-form';
import { UpdateProfileInformationForm } from './partials/update-profile-information-form';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Settings" />
            <div className="mx-auto max-w-7xl space-y-6">
                <UpdateProfileInformationForm />
                <UpdatePasswordForm />
                <DeleteUserForm />
            </div>
        </>
    );
}

Edit.layout = (page) => <AppLayout children={page} />;
