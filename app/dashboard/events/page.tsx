import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/events/table';
import { EventsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchEventsPages, fetchFilteredEvents } from '@/app/lib/data';
import { Metadata } from 'next';
import { auth } from '@/auth';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Event',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sort?: 'name' | 'date';
    order?: 'DESC' | 'ASC';
  };
}) {
  const session = await auth();
  const query = searchParams?.query || '';
  const sort = searchParams?.sort || 'date';
  const order = searchParams?.order === 'DESC' ? 'DESC' : 'ASC'; // Default to ASC  
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchEventsPages(query);

  const events = await fetchFilteredEvents(query, currentPage, sort, order);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Event', href: '/dashboard/events', active: true },
        ]}
      />
      <div className="flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Sök bland event..." />
      </div>
      <Suspense key={query + currentPage} fallback={<EventsTableSkeleton />}>
        <Table events={events} session={session} sort={sort} order={order} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
