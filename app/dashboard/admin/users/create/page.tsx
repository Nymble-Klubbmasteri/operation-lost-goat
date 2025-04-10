import Form from '@/app/ui/admin/users/create-form';
import { lusitana } from '@/app/ui/fonts';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { auth } from '@/auth';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'User Creation',
};

// literally 
 
export default async function Page() { 
  const session = await auth();
  if (!session?.user.role) {
      return (
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Du har ingen roll! :(
        </h1>
      );
  }
  if (session.user.admin !== 'Yes') {
    return (
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Du är inte admin!
      </h1>
    );
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/admin/users' },
          {
            label: 'Create User',
            href: '/dashboard/admin/user/create',
            active: true,
          },
        ]}
      />
      <Form/>
    </main>
  );
}