import Form from '@/app/ui/profile/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';
 
export const metadata: Metadata = {
  title: 'Invoice',
};


 
export default async function Page() {
    const session = await auth();
    if (!session?.user.id) {
        console.log("profile page could not find user");
        notFound();
    }

    const user = await fetchUserById(session.user.id);

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Profile', href: `/dashboard/profile/${session.user.id}` },
            {
                label: 'Edit Profile',
                href: `/dashboard/profile/${session.user.id}`,
                active: true,
            },
            ]}
        />
        <Form user={user} />
        </main>
    );
}