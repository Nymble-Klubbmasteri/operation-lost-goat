'use client';

import { updateSetting } from '@/app/lib/actions';
import { useState } from 'react';

export default function EditForm({ setting }: { setting: { key: string, value: string } }) {
  const [value, setValue] = useState(setting.value);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('saving');
    await updateSetting(setting.key, value);
    setStatus('saved');
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md bg-white w-64">
      <label className="block mb-2 text-sm font-semibold capitalize">{setting.key.replace('_', ' ')}</label>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-full border rounded p-2 mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
        Spara
      </button>
      {status === 'saving' && <p className="text-sm text-gray-500 mt-1">Sparar...</p>}
      {status === 'saved' && <p className="text-sm text-green-600 mt-1">Sparat!</p>}
    </form>
  );
}