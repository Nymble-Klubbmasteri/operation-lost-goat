import Form from '@/app/ui/admin/events/create-form';
import Breadcrumbs from '@/app/ui/admin/events/breadcrumbs';
import { fetchUsers } from '@/app/lib/data';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';
 
export const metadata: Metadata = {
  title: 'Event Creation',
};

// literally 
 
export default async function Page() {
  const session = await auth();
    if (!session?.user.role) {
        return (
          <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Du har ingen roll! :(
          </h1>
        );
    }
  if (session.user.admin !== 'Yes') {
    return (
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Du är inte admin!
      </h1>
    );
  }
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