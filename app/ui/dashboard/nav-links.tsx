'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  NewspaperIcon,
  InboxStackIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { fetchUserById } from '@/app/lib/data';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon, adminProtect: false, marskalkProtect: false },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon, adminProtect: false, marskalkProtect: false },
  { name: 'Events', href: '/dashboard/events', icon: NewspaperIcon, adminProtect: false, marskalkProtect: false },
  { name: 'Administer Users', href: '/dashboard/admin/users', icon: UserGroupIcon, adminProtect: true, marskalkProtect: false },
  { name: 'Administer Events', href: '/dashboard/admin/events', icon: InboxStackIcon, adminProtect: true, marskalkProtect: false },


];

export default function NavLinks({role, admin}: {role: string, admin: string}) {
  const pathname = usePathname();
  // console.log("role: ", role);
  // console.log("admin:", admin);
  // const user = fetchUserById(id);
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
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
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
