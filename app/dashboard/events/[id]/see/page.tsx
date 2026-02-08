import { fetchEventById, fetchUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';
import SeeEvent from '@/app/ui/events/see-event';

export const metadata: Metadata = {
  title: 'Event',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const session = await auth();
  if (!session?.user.id) {
    notFound();
  }

  const [event, user_id] = await Promise.all([
    fetchEventById(id),
    (await fetchUserById(session.user.id)).id
  ]);

  if (!event) {
    notFound();
  }
  return (
    <main>
      <SeeEvent event_id={id} user_id={user_id} />
    </main>
  );
}
