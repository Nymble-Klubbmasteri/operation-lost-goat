import Form from '@/app/ui/admin/events/create-form';
import Breadcrumbs from '@/app/ui/admin/events/breadcrumbs';
import { fetchUsers } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Event Creation',
};

// literally 
 
export default async function Page() {
  const users = await fetchUsers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Events', href: '/dashboard/admin/events' },
          {
            label: 'Create Event',
            href: '/dashboard/admin/events/create',
            active: true,
          },
        ]}
      />
      <Form users={users} />
    </main>
  );
}