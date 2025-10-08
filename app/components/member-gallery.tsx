'use client';

import { useState } from 'react';
import { DisplayUser } from '@/app/lib/definitions';
import Image from 'next/image';
import placeholder_image from '@/public/users/tjacknollan_2.jpg';

export default function MemberGallery({ members }: { members: DisplayUser[] }) {
  // if (members.length === 0) {
  //   return (
  //     <div className="text-center p-8 text-text-light dark:text-text-dark">
  //       No members found for this role.
  //     </div>
  //   );
  // }

  if (members[0].role === 'WraQ' || members[0].role === 'Qnekt') {
    members.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Track which members are currently showing their chaotic image
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const toggle = (name: string) =>
    setFlipped((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {members.map((member) => {
        const isFlipped = !!flipped[member.name];
        return (
          <div
            key={member.name}
            className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md overflow-hidden transition-all duration-300"
          >
            <button
              type="button"
              onClick={() => toggle(member.name)}
              className="aspect-square relative w-full overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/60"
              aria-pressed={isFlipped}
              title={isFlipped ? 'Show nice image' : 'Show chaotic image'}
            >
              {/* Nice image */}
              <Image
                src={member.image_nice_url || placeholder_image}
                alt={`${member.name}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  isFlipped ? 'opacity-0' : 'opacity-100'
                }`}
                priority={false}
              />

              {/* Chaotic image */}
              <Image
                src={member.image_chaotic_url || placeholder_image}
                alt={`${member.name} (alternate)`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  isFlipped ? 'opacity-100' : 'opacity-0'
                }`}
                priority={false}
              />
            </button>

            {/* Content */}
            <div className="p-4 text-center">
              {isFlipped ? (
                <>
                  <h2 className="text-lg font-semibold mb-2">{member.nickname || member.name}</h2>
                  <p className="text-sm text-text-light dark:text-text-dark">Gillar: {member.likes || 'Öl & Fernet'}</p>
                  <p className="text-sm text-text-light dark:text-text-dark">Ogillar: {member.dislikes || 'Kommando Bajs'}</p>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold mb-2">{member.name}</h2>
                  <p className="text-sm text-text-light dark:text-text-dark">{member.title || member.role}</p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}