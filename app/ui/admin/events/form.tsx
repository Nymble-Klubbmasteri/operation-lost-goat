'use client';

import { EventForm, UserField } from '@/app/lib/definitions';
import {
  ClockIcon,
  UserCircleIcon,
  CalendarIcon,
  DocumentTextIcon,
  NewspaperIcon,
  UsersIcon,
  AdjustmentsVerticalIcon,
  HomeIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createEvent, updateEvent } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { AdminRemoveUserFromEvent } from '@/app/lib/actions';
import { formatDateToLocal, eventTypeToString } from '@/app/lib/utils';
import { useState } from 'react';

export default function Form({
  event,
  users,
}: {
  event: EventForm | null;
  users: UserField[];
}) {
  const initialState = { message: null, errors: {} };
  const createOrUpdateEvent = event ? updateEvent.bind(null, event.id) : createEvent;
  const [_, dispatch] = useFormState(createOrUpdateEvent, initialState);
  const [type, setType] = useState(event ? event.type : "");

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
              placeholder="Ange eventnamn..."
              defaultValue={event ? event.name : ""}
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='events-error'
              required
            />
            <NewspaperIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
          </div>
        </div>
      </div>

      {/* Work Time */}
      <div className="mb-4">
        <label htmlFor="work_time" className="mb-2 block text-sm font-medium">
          Arbetstider:
        </label>
        <div className="flex flex-cols">
          <div className="relative">
            <input
              id="start_work_time"
              name="start_work_time"
              type="time"
              defaultValue={event ? event.start_work_time : ""}
              className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pr-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='work-time-error'
              required
            />
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
          <p className="flex items-center justify-center px-2 font-bold">-</p>
          <div className="relative">
            <input
              id="end_work_time"
              name="end_work_time"
              type="time"
              defaultValue={event ? event.end_work_time : ""}
              className="w-35 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pr-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='work-time-error'
              required
            />
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </div>

      {/* Event Time */}
      <div className="mb-4">
        <label htmlFor="event_time" className="mb-2 block text-sm font-medium">
          Eventtider:
        </label>
        <div className="flex flex-cols">
          <div className="relative">
            <input
              id="start_event_time"
              name="start_event_time"
              type="time"
              defaultValue={event ? event.start_event_time : ""}
              className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pr-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='event-time-error'
              required
            />
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
          <p className="flex items-center justify-center px-2 font-bold">-</p>
          <div className="relative">
            <input
              id="end_event_time"
              name="end_event_time"
              type="time"
              defaultValue={event ? event.end_event_time : ""}
              className="w-35 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pr-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='event-time-error'
              required
            />
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
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
              defaultValue={event ? event.sought_workers : ""}
              placeholder="Ange antal arbetare..."
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='workers-error'
              required
            />
            <UsersIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
          </div>
        </div>
      </div>

      {/* Workers */}
      {event && event.workers.length > 0 && (
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
      {event && event.reserves.length > 0 && (
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
              placeholder="Ange lokaler..."
              defaultValue={event ? event.locations : ""}
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='locations-error'
              required
            />
            <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
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
            defaultValue={event ? event.responsible : ""}
            aria-describedby="responsible-error"
            required
          >
            <option value="" disabled selected>
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
              {...(event ? { defaultValue: event.type } : {})}
              onChange={e => setType(e.target.value)}
              aria-describedby="type-error"
              required
            >
              <option value="" disabled selected>
                Välj typ av event
              </option>
              {[0, 1, 2, 3, 4].map((type) => (
                <option key={type} value={type}>
                  {eventTypeToString(type)}
                </option>
              ))}
            </select>
            <AdjustmentsVerticalIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
          </div>
        </div>
      </div>

      {/* Payement */}
      {type == 3 &&
      <div className="mb-4">
        <label htmlFor="payment" className="mb-2 block text-sm font-medium">
          Lön (kr/t)
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="payment"
              name="payment"
              type="number"
              step="1"
              defaultValue={event ? event.payment : ""}
              placeholder="Ange lön i kr/t..."
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='payment-error'
              required
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
          </div>
        </div>
      </div>}
      {type != 3 && <input hidden id="payment" name="payment" type="number" step="1" value={0}/>}

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
              {...(event ? { defaultValue: formatDateToLocal(event.date) } : {})}
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              required
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
            defaultValue={event ? event.notes : ""}
            placeholder="Ange eventdetaljer..."
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
      {event == null && <Button type="submit">Skapa Event</Button>}
      {event != null && <Button type="submit">Spara ändringar</Button>}
    </div>
  </form>
}
