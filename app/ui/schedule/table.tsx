import { fetchFilteredEvents, fetchUserEvents } from '@/app/lib/data';
import { formatDateToLocal } from '@/app/lib/utils';
import { auth } from '@/auth';
import { GoToEvent } from '../events/buttons';
import Link from 'next/link';

export default async function EventsTable() {

    const session = await auth();

    if (!session?.user?.id) {
        console.log("Events Table User not found");
        return null;
    }
    if (!session?.user?.role) {
        console.log("Events Table User Role not found");
        return null;
    }
    
    let events = await fetchUserEvents(session.user.id);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-2 md:pt-0">
          <div className="md:hidden">
            {events?.map((event) => (
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
              {events?.map((event) => (
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
