import Pagination from '@/app/ui/events/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/events/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchEventsPages, fetchFilteredEvents } from '@/app/lib/data';
import { Metadata } from 'next';
import { auth } from '@/auth';
 
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
    <div className="w-full bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Event</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Sök event..." />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table events={events} session={session} sort={sort} order={order} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}