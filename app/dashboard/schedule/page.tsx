import Pagination from '@/app/ui/events/pagination';
import Table from '@/app/ui/schedule/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchUserEvents } from '@/app/lib/data';
import { auth } from '@/auth';
 
export const metadata: Metadata = {
  title: 'Mitt Schema',
};
 
export default async function Page() {
  const session = await auth();

  if (!session?.user.id) {
    return(
      <div>
        Huh?
      </div>
    );
  }

  const events = await fetchUserEvents(session.user.id);
  return (
    <Table events={events} />
  );
}