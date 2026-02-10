'use client';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteItem } from '@/app/lib/actions';


export function CreateItem() {
  return (
    <Link
      href="/dashboard/admin/items/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Skapa Sortiment</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DeleteItem({ id }: { id: number }) {
  const deleteItemWithID = deleteItem.bind(null, id);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const confirmed = confirm("Är du säker på att du vill ta bort detta från sortimentet?");
    if (!confirmed) {
      e.preventDefault();
    }
  };

  return (
    <form action={deleteItemWithID}>
      <button
        type="submit"
        onClick={handleDeleteClick}
        className="flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <span className="sr-only">Ta bort från sortiment</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
