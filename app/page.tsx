// app/page.tsx
import { getUpcomingPub } from '@/app/lib/data';
import NKMLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import logo from '@/public/nkm/skold.png';

export default async function Page() {
  const upcoming = await getUpcomingPub();

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 dark:bg-blue-900 p-4 md:h-52">
        <NKMLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-surface-light dark:bg-surface-dark px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-text-light dark:text-text-dark md:text-3xl md:leading-normal`}>
            <strong>Välkommen till NKMs nya hemsida</strong>, utvecklad av Weebmästare Dadde.
          </p>

          {upcoming && (
            <div className="rounded bg-blue-100 dark:bg-blue-900 p-4 text-sm text-blue-900 dark:text-blue-100">
              <p className="font-semibold">Nästa event:</p>
              <p>{upcoming.name}</p>
              <p>{new Date(upcoming.date).toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500 md:text-base"
            >
              <span>Logga in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
            <Link
              href="/members/marskalkar"
              className="flex items-center gap-5 self-start rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-500 md:text-base"
            >
              <span>Medlemmar</span> <UserGroupIcon className="w-5 md:w-6" />
            </Link>
          </div>
          <div className="mt-6 rounded-lg bg-surface-light dark:bg-surface-dark p-4 text-sm text-text-light dark:text-text-dark">
            Vill du kontakta Nymble Klubbmästeri? Då kan du maila vårt klubbmästarpar på: 
            <a href="mailto:kbm@ths.kth.se" className="text-blue-600 hover:underline ml-1">kbm@ths.kth.se</a>
          </div>
        </div>

        

        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src={logo}
            width={500}
            height={400}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src={logo}
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}