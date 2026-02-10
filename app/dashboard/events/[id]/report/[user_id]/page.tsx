import { fetchEventById, fetchTimeReport } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';
import Form from '@/app/ui/events/time-report';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { eventIsReportable } from '@/app/lib/utils';

export const metadata: Metadata = {
  title: 'Rapportera',
};

export default async function Page({ params }: { params: { id: string; user_id: string; } }) {
  const event_id = params.id;
  const user_id = params.user_id;
  const session = await auth();
  if (!session?.user.id || session.user.id != user_id) {
    notFound();
  }

  const [event, time_report] = await Promise.all([
    fetchEventById(event_id),
    fetchTimeReport(event_id, user_id)
  ]);

  if (!event || !eventIsReportable(event) || !event.workers.includes(user_id)) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Event', href: '/dashboard/events' },
          { label: event.name, href: `/dashboard/events/${event_id}/see` },
          {
            label: 'Rapportera',
            href: `/dashboard/events/${event_id}/report/${session.user.id}`,
            active: true,
          },
        ]}
      />
      <div className="flex">
        <Form event_id={event_id} user_id={user_id} time_report={time_report} />
      </div>
    </main>
  );
}
