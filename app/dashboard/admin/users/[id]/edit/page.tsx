import Form from '@/app/ui/admin/users/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts';
 
export const metadata: Metadata = {
  title: 'Invoice',
};


 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const user = await Promise.all([
        fetchUserById(id)
    ]);
    // console.log("edit user page.tsx, user:", user[0]);
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

    if (!user) {
    notFound();
    }
    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Users', href: '/dashboard/admin/users' },
            {
                label: 'Edit User',
                href: `/dashboard/admin/users/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form user={user[0]}/>
        </main>
    );
}