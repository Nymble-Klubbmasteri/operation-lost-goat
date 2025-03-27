import { PencilIcon, PlusIcon, QueueListIcon, TrashIcon, UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {  AddUserToEvent, RemoveUserFromEvent } from '@/app/lib/actions';

export function SignUp({event_id, user_id}: {event_id: string, user_id: string | undefined}) {
  if (!user_id) {
    return (
      <div>
        User Not Found
      </div>
    );
  }

  const add = AddUserToEvent.bind(null, event_id, user_id);
  return (
    <form action={add}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Sign Up</span>
        <UserPlusIcon className="w-5" />
      </button>
    </form>    
  );
}

export function Remove({ event_id, user_id }: { event_id: string; user_id: string | undefined }) {
  if (!user_id) {
    return <div>User Not Found</div>;
  }

  const remove = RemoveUserFromEvent.bind(null, event_id, user_id);
  return (
    <form action={remove}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Remove</span>
        <UserMinusIcon className="w-5" />
      </button>
    </form>
  );
}

export function GoToEvent({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/events/${id}/see`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <QueueListIcon className="w-5" />
    </Link>
  );
}