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
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Event Name */}
        <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter new events name"
                        defaultValue={event.name}
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
                Starting Work Time
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="start_work_time"
                        name="start_work_time"
                        type="text"
                        defaultValue={event.start_work_time}
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
                Starting Event Time
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="start_event_time"
                        name="start_event_time"
                        type="text"
                        defaultValue={event.start_event_time}
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
                End Work Time
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="end_work_time"
                        name="end_work_time"
                        type="text"
                        defaultValue={event.end_work_time}
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
                Ending Event Time
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="end_event_time"
                        name="end_event_time"
                        defaultValue={event.end_event_time}
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
                Sought Workers
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
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='workers-error'
                    />
                    <UsersIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
            </div>
        </div>

        {/* Workers */}
        {event.workers.length > 0 && (
            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">Signed-Up Workers</label>
                <ul className="space-y-2">
                {event.workers.map((workerId) => {
                    const user = users.find((u) => u.id === workerId);
                    return (
                    user && (
                        <li key={user.id} className="flex items-center justify-between border rounded px-3 py-1 bg-white">
                        <span>{user.name}</span>
                        <Button
                            type="button"
                            onClick={() => AdminRemoveUserFromEvent(event.id, user.id)}
                        >
                        Remove
                        </Button>
                        </li>
                    )
                    );
                })}
                </ul>
            </div>
        )}


        {/* Event Locations Time */}
        <div className="mb-4">
            <label htmlFor="locations" className="mb-2 block text-sm font-medium">
                Ending Event Time
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="locations"
                        name="locations"
                        type="text"
                        placeholder="Enter new events locations"
                        defaultValue={event.locations}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='locations-error'
                    />
                    <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
            </div>
        </div>

        {/* Responsible User */}
        <div className="mb-4">
            <label htmlFor="responsible" className="mb-2 block text-sm font-medium">
            Choose Responsible
            </label>
            <div className="relative">
            <select
                id="responsible"
                name="responsible"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={event.responsible}
                aria-describedby="responsible-error"
            >
                <option value="" disabled>
                Select a user
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

        {/* Event type */}
        <div className="mb-4">
            <label htmlFor="sought_workers" className="mb-2 block text-sm font-medium">
                Type of Event: 0: Inte Arbetspass, 1: Fredagspub, 2: Storevent, 3: Betalevent
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="type"
                        name="type"
                        type="number"
                        step="1"
                        defaultValue={event.type}
                        placeholder="Enter new events type"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='workers-error'
                    />
                    <AdjustmentsVerticalIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
            </div>
        </div>

        {/* Event Date */}
        <div className="mb-4">
            <label htmlFor="date" className="mb-2 block text-sm font-medium">
                Select Event Date
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                <input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={event.date.toISOString().split('T')[0]}
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
        </div>

        {/* Event Notes */}
        <div className="mb-4">
            <label htmlFor="notes" className="mb-2 block text-sm font-medium">
                Enter Event Notes
            </label>
            <div className="relative">
                <DocumentTextIcon className="pointer-events-none absolute left-3 top-4 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                <textarea
                id="notes"
                name="notes"
                defaultValue={event.notes}
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
          Cancel
        </Link>
        <Button type="submit">Edit Event</Button>
      </div>
    </form>
}
