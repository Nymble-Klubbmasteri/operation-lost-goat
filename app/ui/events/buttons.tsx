import { PencilIcon, PlusIcon, QueueListIcon, TrashIcon, UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {  AddUserToEvent, RemoveUserFromEvent } from '@/app/lib/actions';

export function SignUp({event_id, user_id, className}: {event_id: string, user_id: string | undefined, className?: string}) {
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
      <button className={`flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-sm font-medium leading-tight text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}>
        <UserPlusIcon className="w-6 h-6 mr-2" />
        <span>Skriv Upp Dig</span>
      </button>
    </form>    
  );
}

export function Remove({ event_id, user_id, className }: { event_id: string; user_id: string | undefined; className?: string }) {
  if (!user_id) {
    return <div>User Not Found</div>;
  }

  const remove = RemoveUserFromEvent.bind(null, event_id, user_id);
  return (
    <form action={remove}>
      <button className={`flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-sm font-medium leading-tight text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}>
        <UserMinusIcon className="w-6 h-6 mr-2" />
        <span>Ta bort dig</span>
      </button>
    </form>
  );
}

export function GoToEvent({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/events/${id}/see`}
      className="flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-sm font-medium leading-tight text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <QueueListIcon className="w-6 h-6" />
    </Link>
  );
}