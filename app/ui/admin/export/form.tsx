'use client';

import { useState } from 'react';
import { formatDateToLocal } from '@/app/lib/utils';

export default function Form() {
  const today = new Date(Date.now());

  const [date_from, setDateFrom] = useState(today.toDateString());
  const [date_to, setDateTo] = useState(today.toDateString());
  const [status, setStatus] = useState<'väntar' | 'exporterar' | 'exporterat'>('väntar');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('exporterar');
    fetch(
      `/api/admin/export?date_from=${date_from}&date_to=${date_to}`)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${formatDateToLocal(date_from)}_${formatDateToLocal(date_to)}.json`);
        link.click();
        URL.revokeObjectURL(url);
      });
    setStatus('exporterat');
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-600 w-auto text-gray-900 dark:text-gray-100">
      <label className="block mb-2 text-md font-semibold capitalize">Betalda Event</label>
      <div className="flex flex-cols">
        <input
          type="date"
          value={formatDateToLocal(date_from)}
          onChange={e => setDateFrom(e.target.value)}
          className="w-full border rounded p-2 m-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          required
        />
        <p className="flex items-center justify-center px-2 font-bold">-</p>
        <input
          type="date"
          value={formatDateToLocal(date_to)}
          onChange={e => setDateTo(e.target.value)}
          className="w-full border rounded p-2 m-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-400 dark:hover:bg-blue-500 text-white m-2 px-3 py-1 rounded">
        Exportera
      </button>
      {status === 'exporterar' && <p className="text-sm text-gray-500 dark:text-gray-400 ml-2 mt-1">Exporterar...</p>}
      {status === 'exporterat' && <p className="text-sm text-green-600 dark:text-green-400 ml-2 mt-1">Exporterat!</p>}
    </form>
  );
}
