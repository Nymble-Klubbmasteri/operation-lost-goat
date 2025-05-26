import Pagination from '@/app/ui/admin/users/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/admin/accounting/table';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchStreckUsersPages } from '@/app/lib/data';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { CreateUser } from '@/app/ui/admin/users/buttons';
import { auth } from '@/auth';

 
export const metadata: Metadata = {
  title: 'Administrera Listan',
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

  const totalPages = await fetchStreckUsersPages(query);
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

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Användare</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Sök användare..." />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}