
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { auth } from '@/auth';
import Form from '@/app/ui/admin/administration/edit-form';
import { getStreckPrice, getSwishNumber } from '@/app/lib/data';
import { Setting } from '@/app/lib/definitions';
import EditForm from '@/app/ui/admin/administration/edit-form';
import ResetButton from '@/app/ui/admin/administration/reset-button';
 
export const metadata: Metadata = {
  title: 'Administrera Hemsidan',
};
  
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

    const sp = await getStreckPrice();
    const sn = await getSwishNumber();
    
    return (
      <div className="flex gap-4">
        <EditForm setting={sp!} />
        <EditForm setting={sn!} />
        <ResetButton />

      </div>
    );
}
