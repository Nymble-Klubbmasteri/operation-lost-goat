'use client';

import { DisplayUser } from '@/app/lib/definitions';
import Image from 'next/image';
import placeholder_image from '@/public/users/evil-rabbit.png';


export default function MemberGallery({ members }: { members: DisplayUser[] }) {
  if (members.length === 0) {
    return <div className="text-center p-8 text-text-light dark:text-text-dark">No members found for this role.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {members.map((member) => (
        <div key={member.name} className="group bg-surface-light dark:bg-surface-dark rounded-lg shadow-md overflow-hidden transition-all duration-300">
          <div className="aspect-square relative overflow-hidden">
            {/* Nice image */}
            {/* <Image
              src={member.image_nice_url || placeholder_image}
              alt={`${member.name}`}
              height={5000}
              width={6000}
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            >
            </Image> */}
            <img 
              src={member.image_nice_url || '@/public/users/evil-rabbit.png'} 
              alt={`${member.name}`}
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            />
            {/* Chaotic image */}
            {/* <Image
              src={member.image_chaotic_url || placeholder_image}
              alt={`${member.nickname}`}
              height={500}
              width={600}
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            >
            </Image> */}
            <img 
              src={member.image_chaotic_url || '@/public/users/evil-rabbit.png'} 
              alt={`${member.name} (alternate)`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>

          {/* Normal (non-hovered) content */}
          <div className="p-4 group-hover:hidden">
            <h2 className="text-lg font-semibold text-center mb-2">{member.name}</h2>
            <p className="text-center text-sm text-text-light dark:text-text-dark">{member.title || member.role}</p>
          </div>

          {/* Hovered content */}
          <div className="p-4 hidden group-hover:block text-center">
            <h2 className="text-lg font-semibold mb-2">{member.nickname || member.name}</h2>
            <p className="text-sm text-text-light dark:text-text-dark">Gillar: {member.likes || 'Öl & Fernet'}</p>
            <p className="text-sm text-text-light dark:text-text-dark">Ogillar: {member.dislikes || 'Kommando Bajs'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}