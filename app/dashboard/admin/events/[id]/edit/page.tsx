import Form from '@/app/ui/admin/events/form';
import Breadcrumbs from '@/app/ui/admin/events/breadcrumbs';
import { fetchEventById, fetchUsers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Event',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [event, users] = await Promise.all([
    fetchEventById(id),
    fetchUsers(),
  ]);

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

  if (!event) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Event', href: '/dashboard/admin/events' },
          {
            label: 'Redigera',
            href: `/dashboard/admin/events/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form event={event} users={users} />
    </main>
  );
}
