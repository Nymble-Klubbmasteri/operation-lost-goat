// app/members/killingar/page.tsx
import { Suspense } from 'react';
import MemberGallery from '@/app/components/member-gallery';
import MemberNav from '@/app/components/member-nav';
import { fetchMembersByRole } from '@/app/lib/data';

export default async function KillingarPage() {
  // Fetch data on the server side
  const members = await fetchMembersByRole('Killing');
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">NKM Medlemmar</h1>
      
      <MemberNav />
      
      <h2 className="text-2xl font-semibold text-center mb-6">Killingar</h2>
      
      <Suspense fallback={<div className="flex justify-center items-center h-64">
        <div className="text-xl font-semibold">Loading members...</div>
      </div>}>
        <MemberGallery members={members} />
      </Suspense>
    </div>
  );
}