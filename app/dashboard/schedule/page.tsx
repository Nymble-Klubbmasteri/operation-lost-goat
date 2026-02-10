import Table from '@/app/ui/schedule/table';
import { Metadata } from 'next';
import { fetchUserEvents } from '@/app/lib/data';
import { auth } from '@/auth';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Mitt Schema',
};

export default async function Page() {
  const session = await auth();

  if (!session?.user.id) {
    return (
      <div>
        Huh?
      </div>
    );
  }

  const events = await fetchUserEvents(session.user.id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Schema', href: '/dashboard/schedule', active: true },
        ]}
      />
      <Table events={events} user_id={session.user.id} />
    </main>
  );
}
