import { Suspense } from 'react';
import MemberGallery from '@/app/components/member-gallery';
import MemberNav from '@/app/components/member-nav';
import { fetchMembersByRole } from '@/app/lib/data';

export default async function Members({ role, is_dashboard }: { role: string; is_dashboard: boolean }) {
  const members = await fetchMembersByRole(role);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">NKM Medlemmar</h1>

      <MemberNav is_dashboard={is_dashboard} />
      <Suspense fallback={<div className="flex justify-center items-center h-64">
        <div className="text-xl font-semibold">Loading members...</div>
      </div>}>
        <MemberGallery members={members} />
      </Suspense>
    </div>
  );
}
