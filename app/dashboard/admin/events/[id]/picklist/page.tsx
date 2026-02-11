import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchEventById, fetchPicklist, fetchItems } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts';
import { CreateForm } from '@/app/ui/admin/picklist/form';
import FormTable from '@/app/ui/admin/picklist/form-table';

export const metadata: Metadata = {
  title: 'Administrera Plocklista',
};

export default async function Page({ params }: { params: { id: string } }) {
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

  const id = params.id;
  const [event, picklist, items] = await Promise.all([
    fetchEventById(id),
    fetchPicklist(id),
    fetchItems()
  ]);

  if (!event) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Administrera Event', href: '/dashboard/admin/events' },
          { label: event.name, href: `/dashboard/admin/events/${id}/edit` },
          {
            label: 'Plocklista',
            href: `/dashboard/admin/events/${id}/picklist`,
            active: true,
          },
        ]}
      />
      <div className="rounded-md bg-surface-light dark:bg-surface-dark p-4 md:p-6">
        <CreateForm event_id={id} items={items} picklist={picklist} />
        <FormTable event_id={id} picklist={picklist} />
      </div>
    </main>
  );
}
