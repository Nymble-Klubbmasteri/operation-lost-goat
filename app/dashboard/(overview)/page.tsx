import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { Strecka } from '@/app/ui/dashboard/buttons';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData, getUser } from '@/app/lib/data';
import { Suspense } from 'react'; 
import { 
    RevenueChartSkeleton, 
    LatestInvoicesSkeleton,
    CardsSkeleton 
  } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import { Metadata } from 'next';
import { auth } from '@/auth';
import SaldoBox from '@/app/ui/dashboard/saldo';
 
export const metadata: Metadata = {
  title: 'NKM',
};


export default async function Page() {
  const data = await fetchCardData();
  const session = await auth();

  if (!session?.user?.id) {
    console.log();
    console.log("Session", session);
    console.log("User", session?.user);
    console.log("ID", session?.user?.id);
    return (
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Nymble Klubbmästeri
      </h1>
    );
  }



  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Nymble Klubbmästeri
      </h1>
      <div>
        <Suspense>
          <Strecka id={session.user.id}/>
        </Suspense>     
      </div>
      <div>
        <Suspense>
          <SaldoBox id={session.user.id}/>
        </Suspense>
      </div>
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
            <LatestInvoices />
        </Suspense>
      </div> */}
    </main>
  );
}