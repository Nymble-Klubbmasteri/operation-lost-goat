'use client';
import { useState, useEffect } from 'react';
import { fetchFilteredEvents, fetchUserEvents } from '@/app/lib/data';
import { formatDateToLocal } from '@/app/lib/utils';
import { auth } from '@/auth';
import { GoToEvent } from '../events/buttons';
import Link from 'next/link';

import { use } from 'react';

function EventsTableComponent({ events }: { events: any[] }) {
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    const now = new Date();
    setFilteredEvents(
      events.filter(event =>
        showPastEvents ? true : new Date(event.date) >= now
      )
    );
  }, [showPastEvents, events]);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-2 md:pt-0">
          <div className="mb-4 flex justify-end items-center gap-2">
            <label htmlFor="togglePastEvents" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {showPastEvents ? 'Visa tidigare event?' : 'Visa tidigare event?'}
            </label>
            <button
              id="togglePastEvents"
              onClick={() => setShowPastEvents(prev => !prev)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showPastEvents ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showPastEvents ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="md:hidden">
            {filteredEvents?.map((event) => (
              <div
                key={event.id}
                className="mb-2 w-full rounded-md bg-white dark:bg-gray-800 p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="mb-2 flex items-center">
                    <p>{event.name}</p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{formatDateToLocal(event.date)}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <GoToEvent id={event.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 dark:text-gray-100 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Event
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Datum
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Se evenemang</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {filteredEvents?.map((event) => (
                <tr
                  key={event.id}
                  className={`w-full border-b py-3 text-sm ${
                    event.type === 3
                      ? 'bg-green-100 dark:bg-green-900'
                      : event.type === 2
                      ? 'bg-blue-100 dark:bg-blue-900'
                      : event.type === 0
                      ? 'bg-gray-100 dark:bg-gray-800'
                      : 'bg-white dark:bg-gray-800'
                  } [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg`}
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{event.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(event.date)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <GoToEvent id={event.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function EventsTable({ events }: { events: any[] }) {
  return <EventsTableComponent events={events} />;
}
