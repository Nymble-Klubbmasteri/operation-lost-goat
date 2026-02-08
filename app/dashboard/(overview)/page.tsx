import { Strecka } from '@/app/ui/dashboard/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { auth } from '@/auth';
import SaldoBox from '@/app/ui/dashboard/saldo';
import TopList from '@/app/ui/dashboard/top-list';
import TopListByYear from '@/app/ui/dashboard/top-list-year';
import TopListByDate from '@/app/ui/dashboard/top-list-date';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'NKM',
};

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Nymble Klubbmästeri
      </h1>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className={`${lusitana.className} mb-6 text-xl md:text-2xl`}>
        Nymble Klubbmästeri
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column with Strecka and SaldoBox */}
        <div className="w-full md:w-1/3 space-y-6">
          <Suspense fallback={<div>Loading Strecka...</div>}>
            <SessionProvider>
              <Strecka id={session.user.id} role={session.user.role} />
            </SessionProvider>
          </Suspense>

          <Suspense fallback={<div>Loading Saldo...</div>}>
            <SaldoBox id={session.user.id} role={session.user.role} />
          </Suspense>
        </div>

        {/* Right column with TopList (table) */}
        <div className="w-full md:w-2/3">
          <Suspense fallback={<div>Loading Top List...</div>}>
            <TopList />
          </Suspense>
          <Suspense fallback={<div>Loading Top List by year...</div>}>
            <TopListByYear />
          </Suspense>
          <Suspense fallback={<div>Loading Top List last 24 hours...</div>}>
            <TopListByDate />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
