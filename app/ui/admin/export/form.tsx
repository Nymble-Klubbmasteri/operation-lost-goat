'use client';

import { updateSetting } from '@/app/lib/actions';
import { useState } from 'react';
import { formatDateToLocal, eventTypeToString } from '@/app/lib/utils';
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline';

export default function Form() {
  const today = new Date(Date.now());

  const [type, setType] = useState("");
  const [date_from, setDateFrom] = useState(today.toDateString());
  const [date_to, setDateTo] = useState(today.toDateString());
  const [status, setStatus] = useState<'väntar' | 'exporterar' | 'exporterat'>('väntar');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('exporterar');
    fetch(
      `/api/admin/export?type=${type}&date_from=${date_from}&date_to=${date_to}`)
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
      <div className="relative m-2 rounded-md">
        <select
          id="type"
          name="type"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          aria-describedby="type-error"
          onChange={e => setType(e.target.value)}
          required
        >
          <option value="" disabled selected>
            Välj typ av event
          </option>
          {[0, 1, 2, 3].map((type) => (
            <option key={type} value={type}>
              {eventTypeToString(type)}
            </option>
          ))}
        </select>
        <AdjustmentsVerticalIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
      </div>
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
