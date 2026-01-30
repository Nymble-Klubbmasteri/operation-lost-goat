'use client';

import { resetStrecklistaPermanent } from '@/app/lib/actions';
import { useState } from 'react';

export default function ResetButton() {
  const [confirming, setConfirming] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');

  async function handleReset() {
    setStatus('processing');
    await resetStrecklistaPermanent();
    setStatus('done');
  }

  if (status === 'done') {
    return <p className="text-green-600 mt-2">Strecklistan har återställts!</p>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white w-64 text-center mt-4">
      <p className="mb-2 font-semibold text-red-600">⚠️ Nollställ Strecklista</p>
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Nollställ
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-700">Är du säker? Du kommer att permanent ta bort alla streck! Du kommer också att nolla allas saldo</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={handleReset}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Ja, nollställ
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
            >
              Avbryt
            </button>
          </div>
        </div>
      )}
      {status === 'processing' && <p className="text-sm text-gray-500 mt-1">Bearbetar...</p>}
    </div>
  );
}
