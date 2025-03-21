import Form from '@/app/ui/admin/events/edit-form';
import Breadcrumbs from '@/app/ui/admin/events/breadcrumbs';
import { fetchEventById, fetchUsers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Event',
};


 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [event, users] = await Promise.all([
        fetchEventById(id),
        fetchUsers(),
    ]);

    if (!event) {
    notFound();
    }
    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Events', href: '/dashboard/admin/events' },
            {
                label: 'Edit Event',
                href: `/dashboard/admin/events/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form event={event} users={users} />
        </main>
    );
}