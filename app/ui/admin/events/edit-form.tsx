'use client';

import { EventForm, UserField } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  CalendarIcon,
  DocumentTextIcon,
  NewspaperIcon,
  UsersIcon,
  AdjustmentsVerticalIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateEvent } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { AdminRemoveUserFromEvent } from '@/app/lib/actions';
import { formatDateToLocal, eventTypeToString } from '@/app/lib/utils';

export default function EditEventForm({
  event,
  users
}: {
  event: EventForm;
  users: UserField[];
}) {
  const initialState = { message: null, errors: {} };
  const updateEventWithId = updateEvent.bind(null, event.id);
  const [state, dispatch] = useFormState(updateEventWithId, initialState);

  return <form action={dispatch}>
    <div className="rounded-md bg-surface-light dark:bg-surface-dark p-4 md:p-6">
      {/* Event Name */}
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Eventnamn
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter new events name"
              defaultValue={event.name}
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='events-error'
            />
            <NewspaperIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
          </div>
        </div>
      </div>

      {/* Event Start Work Time */}
      <div className="mb-4">
        <label htmlFor="start_work_time" className="mb-2 block text-sm font-medium">
          När börjar man jobba?
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="start_work_time"
              name="start_work_time"
              type="text"
              defaultValue={event.start_work_time}
              placeholder="Enter new events starting work time"
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='work-time-error'
            />
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
          </div>
        </div>
      </div>

      {/* Event Start Event Time */}
      <div className="mb-4">
        <label htmlFor="start_event_time" className="mb-2 block text-sm font-medium">
          När börjar eventet?
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="start_event_time"
              name="start_event_time"
              type="text"
              defaultValue={event.start_event_time}
              placeholder="Enter new events starting event time"
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='event-time-error'
            />
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
          </div>
        </div>
      </div>
      {/* Event End Work Time */}
      <div className="mb-4">
        <label htmlFor="end_work_time" className="mb-2 block text-sm font-medium">
          När slutar man jobba?
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="end_work_time"
              name="end_work_time"
              type="text"
              defaultValue={event.end_work_time}
              placeholder="Enter new events ending work time"
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='work-time-error'
            />
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
          </div>
        </div>
      </div>
      {/* Event End Event Time */}
      <div className="mb-4">
        <label htmlFor="end_event_time" className="mb-2 block text-sm font-medium">
          När slutar eventet?
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="end_event_time"
              name="end_event_time"
              defaultValue={event.end_event_time}
              type="text"
              placeholder="Enter new events ending event time"
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='event-time-error'
            />
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
          </div>
        </div>
      </div>

      {/* Sought Workers */}
      <div className="mb-4">
        <label htmlFor="sought_workers" className="mb-2 block text-sm font-medium">
          Antal Arbetare
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="sought_workers"
              name="sought_workers"
              type="number"
              step="1"
              defaultValue={event.sought_workers}
              placeholder="Enter new events amount of workers"
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='workers-error'
            />
            <UsersIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
          </div>
        </div>
      </div>

      {/* Workers */}
      {event.workers.length > 0 && (
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Uppskrivna</label>
          <ul className="space-y-2">
            {event.workers.map((workerId) => {
              const user = users.find((u) => u.id === workerId);
              return (
                user && (
                  <li key={user.id} className="flex items-center justify-between border border-gray-200 dark:border-gray-600 rounded px-3 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                    <span>{user.name}</span>
                    <Button
                      type="button"
                      onClick={() => AdminRemoveUserFromEvent(event.id, user.id)}
                    >
                      Ta bort
                    </Button>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      )}

      {/* Reserves */}
      {event.reserves.length > 0 && (
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Reserver</label>
          <ul className="space-y-2">
            {event.reserves.map((workerId) => {
              const user = users.find((u) => u.id === workerId);
              return (
                user && (
                  <li key={user.id} className="flex items-center justify-between border border-gray-200 dark:border-gray-600 rounded px-3 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                    <span>{user.name}</span>
                    <Button
                      type="button"
                      onClick={() => AdminRemoveUserFromEvent(event.id, user.id)}
                    >
                      Ta bort
                    </Button>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      )}


      {/* Event Locations */}
      <div className="mb-4">
        <label htmlFor="locations" className="mb-2 block text-sm font-medium">
          Lokaler
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="locations"
              name="locations"
              type="text"
              placeholder="Enter new events locations"
              defaultValue={event.locations}
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='locations-error'
            />
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
          </div>
        </div>
      </div>

      {/* Responsible User */}
      <div className="mb-4">
        <label htmlFor="responsible" className="mb-2 block text-sm font-medium">
          Ansvarig
        </label>
        <div className="relative">
          <select
            id="responsible"
            name="responsible"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            defaultValue={event.responsible}
            aria-describedby="responsible-error"
          >
            <option value="" disabled>
              Välj en användare
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
        </div>
      </div>

      {/* Event type */}
      <div className="mb-4">
        <label htmlFor="type" className="mb-2 block text-sm font-medium">
          Typ av event
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <select
              id="type"
              name="type"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              defaultValue={event.type}
              aria-describedby="type-error"
            >
              <option value="" disabled>
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
        </div>
      </div>

      {/* Open for all members toggle (only for Betalevent) */}
      {event.type === 3 && (
        <div className="mb-4">
          <label htmlFor="open" className="mb-2 block text-sm font-medium">
            Öppna för alla medlemmar
          </label>
          <div className="flex items-center">
            <input
              id="open"
              name="open"
              type="checkbox"
              value={event.open || 1}
              defaultChecked={event.open === 1}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Ja</span>
          </div>
          {/* Hidden input to ensure '0' is sent if checkbox is unchecked */}
          <input type="hidden" name="open" value="0" />
        </div>
      )}

      {/* Event Date */}
      <div className="mb-4">
        <label htmlFor="date" className="mb-2 block text-sm font-medium">
          Datum
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={formatDateToLocal(event.date)}
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
          </div>
        </div>
      </div>

      {/* Event Notes */}
      <div className="mb-4">
        <label htmlFor="notes" className="mb-2 block text-sm font-medium">
          Anteckningar
        </label>
        <div className="relative">
          <DocumentTextIcon className="pointer-events-none absolute left-3 top-4 h-[18px] w-[18px] text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
          <textarea
            id="notes"
            name="notes"
            defaultValue={event.notes}
            placeholder="Enter details about the event..."
            rows={4}
            className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 pr-3 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
      </div>

    </div>
    <div className="mt-6 flex justify-end gap-4">
      <Link
        href="/dashboard/admin/events"
        className="flex h-10 items-center rounded-lg bg-surface-light dark:bg-surface-dark px-4 text-sm font-medium text-text-light dark:text-text-dark transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        Avbryt
      </Link>
      <Button type="submit">Spara ändringar</Button>
    </div>
  </form>
}
