'use client';

import { updateSetting } from '@/app/lib/actions';
import { useState } from 'react';

export default function EditForm({ setting }: { setting: { key: string, value: string } }) {
  const [value, setValue] = useState(setting.value);
  const [status, setStatus] = useState<'väntar' | 'sparar' | 'sparat'>('väntar');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sparar');
    await updateSetting(setting.key, value);
    setStatus('sparat');
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-600 w-64 text-gray-900 dark:text-gray-100">
      <label className="block mb-2 text-sm font-semibold capitalize">{setting.key.replace('_', ' ')}</label>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-full border rounded p-2 mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
      />
      <button type="submit" className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-400 dark:hover:bg-blue-500 text-white px-3 py-1 rounded">
        Spara
      </button>
      {status === 'sparar' && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sparar...</p>}
      {status === 'sparat' && <p className="text-sm text-green-600 dark:text-green-400 mt-1">Sparat!</p>}
    </form>
  );
}