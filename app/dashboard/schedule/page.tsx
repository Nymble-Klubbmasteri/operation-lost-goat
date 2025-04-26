import Pagination from '@/app/ui/events/pagination';
import Table from '@/app/ui/schedule/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Mitt Schema',
};
 
export default async function Page() {
  return (
    <Table></Table>
  );
}