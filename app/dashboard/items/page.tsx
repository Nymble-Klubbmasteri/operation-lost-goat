import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/items/table';
import { ItemsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchItemsPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { auth } from '@/auth';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Sortiment',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  if (!session?.user?.role) {
    return null;
  }

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchItemsPages(query);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sortiment', href: '/dashboard/items', active: true },
        ]}
      />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Sök bland sortiment..." />
      </div>
      <Suspense key={query + currentPage} fallback={<ItemsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
