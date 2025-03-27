import Form from '@/app/ui/admin/events/edit-form';
import Breadcrumbs from '@/app/ui/admin/events/breadcrumbs';
import { fetchEventById, fetchUserById, fetchUsers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { GoToEvent } from '@/app/ui/events/buttons';
import { auth } from '@/auth';
import SeeEvent from '@/app/ui/events/see-event';
 
export const metadata: Metadata = {
  title: 'Event',
};


 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const session = await auth();
    if (!session?.user.id) {
        console.log("event see page could not find user");
        notFound();
    }

    const [event, user_id] = await Promise.all([
        fetchEventById(id),
        (await fetchUserById(session.user.id)).id
    ]);

    if (!event) {
    notFound();
    }
    return (
        <main>
            <SeeEvent event_id ={id} user_id={user_id}/>
        </main>
    );
}