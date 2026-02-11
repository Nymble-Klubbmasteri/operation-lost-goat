import Link from 'next/link';
import { UsersIcon, CalendarIcon, ClockIcon, HomeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { fetchEventById, fetchPicklist, fetchUserNamesByIDs } from '@/app/lib/data';
import { Remove, ReportOnEventText, SignUp } from './buttons';
import { formatDateToLocal, eventTypeToString, eventIsReportable, eventWorkStartDateTime } from '@/app/lib/utils';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Table from '../picklist/table';

export default async function SeeEvent({ event_id, user_id }: { event_id: string; user_id: string }) {
  const event = await fetchEventById(event_id);
  const workers = await fetchUserNamesByIDs(event.workers);
  const reserves = await fetchUserNamesByIDs(event.reserves);
  const picklist = await fetchPicklist(event_id);

  const current_date_time = new Date();
  const event_work_start_date_time = eventWorkStartDateTime(event);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Event', href: '/dashboard/events' },
          { label: event.name, href: `/dashboard/events/${event_id}/see`, active: true, },
        ]}
      />
      <div className="rounded-md bg-surface-light dark:bg-surface-dark p-6 text-text-light dark:text-text-dark">
        {/* Event Name */}
        <h1 className="text-xl font-bold">{event.name}</h1>
        <p className="text-sm text-text-light dark:text-text-dark">{event.notes}</p>

        {/* Event Date */}
        <div className="mt-4 flex items-center">
          <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <p>{formatDateToLocal(event.date)}</p>
        </div>

        {/* Lokaler */}
        <div className="mt-2 flex items-center">
          <HomeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <p>Lokaler: {event.locations}</p>
        </div>

        {/* Lön */}
        {event.type == 3 && event.payment != 0 &&
          <div className="mt-2 flex items-center">
            <CurrencyDollarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <p>Lön: {event.payment} kr/t</p>
          </div>}

        {/* Event Time */}
        <div className="mt-4 flex items-center">
          <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <p>Jobbtider: {event.start_work_time} - {event.end_work_time}</p>
        </div>
        <div className="mt-2 flex items-center">
          <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <p>Eventtider: {event.start_event_time} - {event.end_event_time}</p>
        </div>

        {/* Number of Workers */}
        <div className="mt-4 flex items-center">
          <UsersIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <p>{(event.workers ?? []).length}/{event.sought_workers} uppskrivna</p>
        </div>

        {/* Event type */}
        <div className="mb-4">
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <p>Typ av event: {eventTypeToString(event.type)}</p>
            </div>
          </div>
        </div>

        {/* Signed up */}
        {workers.length !== 0 &&
          (<div className="mt-4">
            <div className="flex items-center mb-2">
              <UsersIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <span>Uppskrivna</span>
            </div>
            <div className="flex flex-col gap-1">
              {workers.map((row, idx) => (
                <div key={idx}>{row.name} | {row.nickname}</div>
              ))}
            </div>
          </div>)}

        {/* Reserves */}
        {reserves.length !== 0 &&
          (<div className="mt-4">
            <div className="flex items-center mb-2">
              <UsersIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <span>Reserver</span>
            </div>
            <div className="flex flex-col gap-1">
              {reserves.map((row, idx) => (
                <div key={idx}>{row.name} | {row.nickname}</div>
              ))}
            </div>
          </div>)}

        {/* Sign Up / Remove Button */}
        <div className="mt-2">
          <div className="flex justify-end gap-4 [&>*]:px-6 [&>*]:py-3 [&>*]:text-lg [&>*]:rounded-lg">
            {event_work_start_date_time > current_date_time && !event.workers.includes(user_id) && !event.reserves.includes(user_id) && (
              <SignUp event_id={event_id} user_id={user_id} className="w-40 h-12 text-lg" />
            )}

            {/* Reserves can always remove themselves, workers can if the event is more than three days away or there are reserves */}
            {event.reserves.includes(user_id) ||
              (event.workers.includes(user_id) &&
                ((event_work_start_date_time.getTime() - current_date_time.getTime() > 3 * 24 * 60 * 60 * 1000) ||
                  event.reserves.length != 0)) &&
              <Remove event_id={event_id} user_id={user_id} className="w-40 h-12 text-lg" />
            }

            {eventIsReportable(event) && event.workers.includes(user_id) && <ReportOnEventText event_id={event_id} user_id={user_id} />}
          </div>
        </div>

        {/* Back to Events */}
        <div className="mt-2">
          <Link href="/dashboard/events" className="text-blue-600 dark:text-blue-400 hover:underline">
            Tillbaka till evenemang
          </Link>
        </div>
      </div>
      {picklist.length != 0 &&
        <div className="mt-2 rounded-md bg-surface-light dark:bg-surface-dark p-6 text-text-light dark:text-text-dark">
          <h1 className="text-xl font-bold">Plocklista</h1>
          <Table items={picklist} />
        </div>
      }
    </main>
  );
}
