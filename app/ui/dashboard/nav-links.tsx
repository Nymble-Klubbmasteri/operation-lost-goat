'use client';
import {
  UserGroupIcon,
  TicketIcon,
  DocumentDuplicateIcon,
  NewspaperIcon,
  InboxStackIcon,
  UserIcon,
  WrenchIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ArrowDownOnSquareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { fetchUserById } from '@/app/lib/data';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Strecka', href: '/dashboard', icon: TicketIcon, adminProtect: false, marskalkProtect: false },
  { name: 'Medlemmar', href: '/dashboard/members/marskalkar', icon: UsersIcon, adminProtect: false, marskalkProtect: false },
  { name: 'Profil', href: '/dashboard/profile', icon: UserIcon, adminProtect: false, marskalkProtect: false },
  { name: 'Event', href: '/dashboard/events', icon: NewspaperIcon, adminProtect: false, marskalkProtect: false },
  { name: 'Mitt Schema', href: '/dashboard/schedule', icon: CalendarIcon, adminProtect: false, marskalkProtect: false },
  { name: 'Administrera Användare', href: '/dashboard/admin/users', icon: UserGroupIcon, adminProtect: true, marskalkProtect: false },
  { name: 'Administrera Event', href: '/dashboard/admin/events', icon: InboxStackIcon, adminProtect: true, marskalkProtect: false },
  { name: 'Administrera Sidan', href: '/dashboard/admin/administration', icon: WrenchIcon, adminProtect: true, marskalkProtect: false },
  { name: 'Administrera Listan', href: '/dashboard/admin/listan', icon: CurrencyDollarIcon, adminProtect: true, marskalkProtect: false },
  { name: 'Exportera Event', href: '/dashboard/admin/export', icon: ArrowDownOnSquareIcon, adminProtect: true, marskalkProtect: false },
];

export default function NavLinks({ role, admin }: { role: string, admin: string }) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        if (link.adminProtect) {
          if (admin !== "Yes") {
            return null;
          }
        }
        if (link.marskalkProtect) {
          if ((role === "Killing" || role === "Inaktiv" || role === "Utesluten" || role === "Qnekt") && admin !== "Yes") {
            return null;
          }
        }
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-surface-light dark:bg-surface-dark p-3 text-sm font-medium hover:bg-sky-100 dark:hover:bg-sky-900 hover:text-blue-600 dark:hover:text-blue-400 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600 dark:bg-sky-900 dark:text-blue-400': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
