'use client';
import { ClipboardIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteEvent } from '@/app/lib/actions';


export function CreateEvent() {
  return (
    <Link
      href="/dashboard/admin/events/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Skapa Event</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateEvent({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/admin/events/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100  border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteEvent({ id }: { id: string }) {
  const deleteEventWithID = deleteEvent.bind(null, id);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const confirmed = confirm("Är du säker på att du vill ta bort detta event?");
    if (!confirmed) {
      e.preventDefault();
    }
  };

  return (
    <form action={deleteEventWithID}>
      <button
        type="submit"
        onClick={handleDeleteClick}
        className="flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <span className="sr-only">Ta bort event</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function ChangePicklist({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/admin/events/${id}/picklist`}
      className="rounded-md border p-2 hover:bg-gray-100  border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700"
    >
      <ClipboardIcon className="w-5" />
    </Link>
  );
}
