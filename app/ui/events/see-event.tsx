
import { useState } from 'react';
import { EventForm, UserField } from '@/app/lib/definitions';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { UsersIcon, CalendarIcon, ClockIcon, DocumentTextIcon, AdjustmentsVerticalIcon } from '@heroicons/react/24/outline';
import { AddUserToEvent, RemoveUserFromEvent } from '@/app/lib/actions';
import { fetchEventById, fetchUserById, fetchUserNamesByIDs } from '@/app/lib/data';
import { Remove, SignUp } from './buttons';

export default async function SeeEvent({ event_id, user_id }: { event_id: string; user_id: string }) {
    const event = await fetchEventById(event_id);   
    const workers = await fetchUserNamesByIDs(event.workers);
    // console.log("see event", event);
    // console.log("event workers:", event.workers);
    // console.log("worker names: ", workers);
    
    return (
        <div className="rounded-md bg-gray-50 p-6">
            {/* Event Name */}
            <h1 className="text-xl font-bold">{event.name}</h1>
            <p className="text-sm text-gray-600">{event.notes}</p>

            {/* Event Date */}
            <div className="mt-4 flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                <p>{new Date(event.date).toLocaleDateString()}</p>
            </div>

            {/* Event Time */}
            <div className="mt-2 flex items-center">
                <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                <p>Jobbtider: {event.start_work_time} - {event.end_work_time}</p>
            </div>
            <div className="mt-2 flex items-center">
                <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                <p>Eventtider: {event.start_event_time} - {event.end_event_time}</p>
            </div>

            {/* Number of Workers */}
            <div className="mt-4 flex items-center">
                <UsersIcon className="h-5 w-5 text-gray-500 mr-2" />
                <p>{(event.workers ?? []).length}/{event.sought_workers} uppskrivna</p>
            </div>

            {/* Event type */}
            <div className="mb-4">
            <label htmlFor="sought_workers" className="mb-2 block text-sm font-medium">
                Eventtyper: 0: Inte Arbetspass, 1: Fredagspub (eller liknande), 2: Storevent, 3: Betalevent
            </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <p>Typ av event: {event.type}</p>
                    </div>
                </div>
            </div>

            {/* Signed up */}
            <div className="mt-4">
            <div className="flex items-center mb-2">
                <UsersIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span>Uppskrivna:</span>
            </div>
            <div className="flex flex-col gap-1">
                {workers.map((name, idx) => (
                <div key={idx}>{name}</div>
                ))}
            </div>
            </div>

            {/* Sign Up / Remove Button */}
            <div className="mt-6">
                <div className="flex justify-end gap-3">
                    {new Date(event.date) > new Date() && event.workers.length < event.sought_workers && !event.workers.includes(user_id) && (
                    <SignUp event_id={event_id} user_id={user_id} />
                    )}

                    {new Date(event.date).getTime() - new Date().getTime() > 3 * 24 * 60 * 60 * 1000 && 
                    event.workers.includes(user_id) && (
                        <Remove event_id={event_id} user_id={user_id} />
                    )}
                </div>
            </div>

            {/* Back to Events */}
            <div className="mt-6">
                <Link href="/dashboard/events" className="text-blue-600 hover:underline">
                    Tillbaka till evenemang
                </Link>
            </div>
        </div>
    );
}
