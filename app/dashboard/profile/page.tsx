import Form from '@/app/ui/profile/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function Page() {
  const session = await auth();
  if (!session?.user.id) {
    notFound();
  }

  const user = await fetchUserById(session.user.id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Profil', href: `/dashboard/profile`, active: true },
        ]}
      />
      <Form user={user} />
    </main>
  );
}
