import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import FormTable from '@/app/ui/admin/items/form-table';
import { CreateForm } from '@/app/ui/admin/items/form';
import { lusitana } from '@/app/ui/fonts';
import { EventsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchItemsPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { auth } from '@/auth';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Administrera Sortiment',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

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

  const totalPages = await fetchItemsPages(query);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Administrera Sortiment', href: '/dashboard/admin/items', active: true },
        ]}
      />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Sök bland sortiment..." />
      </div>
      <div className="mt-1 flex items-center justify-between gap-2 md:mt-4">
        <CreateForm />
      </div>
      <Suspense key={query + currentPage} fallback={<EventsTableSkeleton />}>
        <FormTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
