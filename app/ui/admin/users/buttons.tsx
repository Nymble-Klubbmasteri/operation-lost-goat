import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteUser } from '@/app/lib/actions';


export function CreateUser() {
  return (
    <Link
      href="/dashboard/admin/users/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 dark:bg-blue-700 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 dark:hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Skapa Användare</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateUser({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/admin/users/${id}/edit`}
      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteUser({ id }: { id: string }) {
  const deleteUserWithID = deleteUser.bind(null, id);  
  return (
    <form action={deleteUserWithID}>
      <button className="flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
        <span className="sr-only">Ta bort användare</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
