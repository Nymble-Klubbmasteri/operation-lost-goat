'use client';

import { useState } from 'react';
import { updateBalance } from '@/app/lib/actions'; // adjust path if needed
import { useSession } from 'next-auth/react'; // if you're using next-auth
import { PencilIcon } from '@heroicons/react/24/outline';
import { auth } from '@/auth';
import toast from 'react-hot-toast';

export function AdjustBalanceButton({ userId, adminId }: { userId: string, adminId: string }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');

  async function handleUpdate() {
    if (!adminId) {
      toast.error('Ingen adminsessions hittades!'); // prettier error
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
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Justera Saldo</h2>
            <input
              type="number"
              className="border p-2"
              placeholder="Belopp"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Uppdatera
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
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