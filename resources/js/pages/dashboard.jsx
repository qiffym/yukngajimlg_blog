import { AppLayout } from '@/layouts/app-layout';
import { Container } from '@/components/container';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div>
            <Head title="Dashboard" />
            <Container>Dashboard page</Container>
        </div>
    );
}

Dashboard.layout = (page) => <AppLayout children={page} />;
