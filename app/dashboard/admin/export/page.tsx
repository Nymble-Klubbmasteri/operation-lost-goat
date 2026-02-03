import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';
import EditForm from '@/app/ui/admin/export/edit-form';

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
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Exportera Event</h1>
      </div>
      <div className="mt-4 flex gap-4">
        <EditForm />
      </div>
    </div>
  );
}
