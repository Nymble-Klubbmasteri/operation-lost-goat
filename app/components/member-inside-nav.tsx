// app/components/member-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const rolePages = [
  { name: 'Marskalkar', path: '/dashboard/members/marskalkar' },
  { name: 'Killingar', path: '/dashboard/members/killingar' },
  { name: 'Wraq', path: '/dashboard/members/wraq' },
  { name: 'Qnektar', path: '/dashboard/members/qnektar' },
];

export default function MemberNav() {
  const pathname = usePathname();
  
  return (
    <div className="bg-gray-100 rounded-lg mb-6">
      <nav className="flex flex-wrap justify-center p-4">
        {rolePages.map((role) => {
          const isActive = pathname === role.path;
          return (
            <Link
              key={role.path}
              href={role.path}
              className={`
                mx-2 my-1 px-4 py-2 rounded-md transition-colors
                ${isActive 
                  ? 'bg-blue-600 text-white font-medium' 
                  : 'bg-white hover:bg-blue-100 text-blue-600'}
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