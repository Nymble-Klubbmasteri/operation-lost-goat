'use client';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deletePicklistItem } from '@/app/lib/actions';


export function DeleteItem({ event_id, item_id }: { event_id: string; item_id: number }) {
  const deleteItemWithID = deletePicklistItem.bind(null, event_id, item_id);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const confirmed = confirm("Är du säker på att du vill ta bort detta från plocklistan?");
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
        <span className="sr-only">Ta bort från plocklistan</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
