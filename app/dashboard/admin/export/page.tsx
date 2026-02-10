import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';
import Form from '@/app/ui/admin/export/form';
import Breadcrumbs from '@/app/ui/breadcrumbs';

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
          { label: 'Exportera', href: '/dashboard/export', active: true },
        ]}
      />
      <div className="mt-4 flex gap-4">
        <Form />
      </div>
    </main>
  );
}
