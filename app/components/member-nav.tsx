// app/components/member-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const rolePages = [
  { name: 'Marskalkar', path: '/members/marskalkar' },
  { name: 'Killingar', path: '/members/killingar' },
  { name: 'WraQ', path: '/members/wraq' },
  { name: 'Qnektar', path: '/members/qnektar' },
];

export default function MemberNav({ is_dashboard }: { is_dashboard: boolean }) {
  const pathname = usePathname();

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-lg mb-6">
      <nav className="flex flex-wrap justify-center p-4">
        {!is_dashboard && (
          <Link
            key="/"
            href="/"
            className={`
                mx-2 my-1 px-4 py-2 rounded-md transition-colors
                ${pathname === "/"
                ? 'bg-blue-600 dark:bg-blue-700 text-white dark:text-gray-100 font-medium'
                : 'bg-surface-light dark:bg-surface-dark hover:bg-blue-100 dark:hover:bg-blue-700 text-blue-600 dark:text-blue-300'}
              `}
          >
            Tillbaka
          </Link>
        )}
        {rolePages.map((role) => {
          const path = (is_dashboard ? "/dashboard" : "") + role.path;
          const isActive = pathname === path;

          return (
            <Link
              key={path}
              href={path}
              className={`
                mx-2 my-1 px-4 py-2 rounded-md transition-colors
                ${isActive
                  ? 'bg-blue-600 dark:bg-blue-700 text-white dark:text-gray-100 font-medium'
                  : 'bg-surface-light dark:bg-surface-dark hover:bg-blue-100 dark:hover:bg-blue-700 text-blue-600 dark:text-blue-300'}
              `}
            >
              {role.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
