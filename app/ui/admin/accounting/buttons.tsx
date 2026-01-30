'use client';

import { useState } from 'react';
import { removeStreck, updateBalance } from '@/app/lib/actions'; // adjust path if needed
import { useSession } from 'next-auth/react'; // if you're using next-auth
import { MinusIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import { auth } from '@/auth';
import toast from 'react-hot-toast';

export function AdjustBalanceButton({ userId, adminId }: { userId: string, adminId: string }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');

  async function handleUpdate() {
    if (!adminId) {
      toast.error('Ingen admin session hittades!'); // prettier error
      return;
    }

    try {
      const promise = updateBalance(userId, adminId, amount);

      toast.promise(
        promise,
        {
          loading: 'Uppdaterar saldo...',
          success: 'Saldo uppdaterat!',
          error: 'Misslyckades med att uppdatera saldo',
        }
      );

      await promise;
      setOpen(false);
      window.location.reload(); // refresh after success
    } catch (err) {
      console.error('Failed to update balance', err);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <PlusIcon className="w-5" />
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Justera Saldo</h2>
            <input
              type="number"
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-2"
              placeholder="Belopp"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 dark:bg-green-700 hover:bg-green-500 dark:hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Uppdatera
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-400 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function DeleteStreckButton({ id, user_id }: { id: string, user_id: string }) {
  const deleteStreckWithID = removeStreck.bind(null, id, user_id);
  return (
    <form action={deleteStreckWithID}>
      <button className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
        <span className="sr-only">Ta bort streck</span>
        <MinusIcon className="w-5" />
      </button>
    </form>
  );
}
