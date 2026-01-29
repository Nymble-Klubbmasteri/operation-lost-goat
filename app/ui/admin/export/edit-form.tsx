'use client';

import { updateSetting } from '@/app/lib/actions';
import { useState } from 'react';
import { formatDateToLocal } from '@/app/lib/utils';
import {
  CalendarIcon,
} from '@heroicons/react/24/outline';

export default function EditForm() {
  const today = new Date(Date.now());

  console.log(today.toDateString(), today.toDateString());

  const [date_from, setDateFrom] = useState(today.toDateString());
  const [date_to, setDateTo] = useState(today.toDateString());
  const [status, setStatus] = useState<'väntar' | 'exporterar' | 'exporterat'>('väntar');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('exporterar');
    fetch(
      `/api/admin/export?type=3&date_from=${date_from}&date_to=${date_to}`)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${date_from}_${date_to}.json`);
        link.click();
        URL.revokeObjectURL(url);
      });
    setStatus('exporterat');
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-600 w-64 text-gray-900 dark:text-gray-100">
      <label className="block mb-2 text-sm font-semibold capitalize">Exportera</label>
      <input
        type="date"
        value={formatDateToLocal(date_from)}
        onChange={e => setDateFrom(e.target.value)}
        className="w-full border rounded p-2 mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
      />
      <input
        type="date"
        value={formatDateToLocal(date_to)}
        onChange={e => setDateTo(e.target.value)}
        className="w-full border rounded p-2 mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
      />
      <button type="submit" className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-400 dark:hover:bg-blue-500 text-white px-3 py-1 rounded">
        Exportera
      </button>
      {status === 'exporterar' && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Exporterar...</p>}
      {status === 'exporterat' && <p className="text-sm text-green-600 dark:text-green-400 mt-1">Exporterat!</p>}
    </form>
  );
}
