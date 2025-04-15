import { fetchFilteredEvents } from '@/app/lib/data';
import { formatDateToLocal } from '@/app/lib/utils';
import { auth } from '@/auth';
import { GoToEvent } from './buttons';
import Link from 'next/link';

export default async function EventsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  let events = await fetchFilteredEvents(query, currentPage);
  
  const session = await auth();


  if (!session?.user?.id) {
    console.log("Events Table User not found");
    return null;
  }
  if (!session?.user?.role) {
    console.log("Events Table User Role not found");
    return null;
  }

  // Filter events of type 3 unless the user is Marskalk or WraQ
  if (session.user.role !== 'Marskalk' && session.user.role !== 'WraQ') {
    events = events.filter((event) => event.type !== 3);
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {events?.map((event) => (
              <div
                key={event.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="mb-2 flex items-center">
                    <p>{event.name}</p>
                  </div>
                  <p className="text-sm text-gray-500">{formatDateToLocal(event.date)}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <GoToEvent id={event.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
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
            <tbody className="bg-white">
              {events?.map((event) => (
                <tr
                key={event.id}
                className={`w-full border-b py-3 text-sm ${
                  event.type === 3
                    ? 'bg-green-100'
                    : event.type === 2
                    ? 'bg-blue-100'
                    : event.type === 0
                    ? 'bg-gray-100'
                    : 'bg-white'
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
