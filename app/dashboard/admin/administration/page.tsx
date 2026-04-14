import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { getFlipperCode, getSkoldCode, getStreckPrice, getSwishNumber } from '@/app/lib/data';
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
  const fk = await getFlipperCode();
  const sk = await getSkoldCode();

  return (
    <div className="flex gap-4">
      <EditForm setting={sp!} />
      <EditForm setting={sn!} />
      <EditForm setting={sk!} />
      <EditForm setting={fk!} />
      {/* Uncomment below when ready to launch */}
      {/* <ResetButton /> */}

    </div>
  );
}
