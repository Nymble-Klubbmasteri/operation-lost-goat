'use client';

import { EventField, UserField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  ClockIcon,
  UserCircleIcon,
  NewspaperIcon,
  UsersIcon,
  CalendarIcon,
  DocumentTextIcon,
  AdjustmentsVerticalIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createEvent } from '@/app/lib/actions';
import { useFormState } from 'react-dom';



export default function Form({ users }: {users: UserField[]}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createEvent, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='events-error'
                    />
                    <NewspaperIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
                        placeholder="Enter new events starting work time"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='work-time-error'
                    />
                    <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
                        placeholder="Enter new events starting event time"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='event-time-error'
                    />
                    <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
                        placeholder="Enter new events ending work time"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='work-time-error'
                    />
                    <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
                        type="text"
                        placeholder="Enter new events ending event time"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='event-time-error'
                    />
                    <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
                        placeholder="Enter new events amount of workers"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='workers-error'
                    />
                    <UsersIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
            </div>
        </div>

        {/* Event type */}
        <div className="mb-4">
            <label htmlFor="sought_workers" className="mb-2 block text-sm font-medium">
                Typ av Event: 0: Inte Arbetspass, 1: Fredagspub, 2: Storevent, 3: Betalevent
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="type"
                        name="type"
                        type="number"
                        step="1"
                        placeholder="Enter new events type"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='workers-error'
                    />
                    <AdjustmentsVerticalIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
            </div>
        </div>

        {/* Event Locations Time */}
        <div className="mb-4">
            <label htmlFor="locations" className="mb-2 block text-sm font-medium">
                Platser
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="locations"
                        name="locations"
                        type="text"
                        placeholder="Enter new events locations"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='locations-error'
                    />
                    <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
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
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
        </div>

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
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
        </div>

        {/* Event Notes */}
        <div className="mb-4">
            <label htmlFor="notes" className="mb-2 block text-sm font-medium">
                Anteckningar
            </label>
            <div className="relative">
                <DocumentTextIcon className="pointer-events-none absolute left-3 top-4 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                <textarea
                id="notes"
                name="notes"
                defaultValue={""}
                placeholder="Enter details about the event..."
                rows={4}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm outline-2 placeholder:text-gray-500"
                />
            </div>
        </div>
    </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/admin/events"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Avbryt
        </Link>
        <Button type="submit">Skapa Event</Button>
      </div>
    </form>
  );
}
