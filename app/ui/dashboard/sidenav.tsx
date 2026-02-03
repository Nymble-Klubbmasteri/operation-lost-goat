import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import NKMLogo from '@/app/ui/acme-logo';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default async function SideNav({ role, admin }: { role: string, admin: string }) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 rounded-md p-4 md:h-40"
        href="/"
      >
        <div className="h-full w-full flex justify-center items-center">
          <NKMLogo className="max-h-full w-auto object-contain" />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 overflow-y-auto md:flex-col md:space-x-0 md:space-y-2">        <NavLinks role={role} admin={admin} />
        <div className="hidden h-auto w-full grow rounded-md bg-surface-light dark:bg-surface-dark md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-surface-light dark:bg-surface-dark p-3 text-sm font-medium hover:bg-sky-100 dark:hover:bg-sky-900 hover:text-blue-600 dark:hover:text-blue-400 md:flex-none md:justify-start md:p-2 md:px-3">
            <ArrowLeftStartOnRectangleIcon className="w-6" />
            <div className="hidden md:block">Logga ut</div>
          </button>
        </form>
      </div>
    </div>
  );
}
