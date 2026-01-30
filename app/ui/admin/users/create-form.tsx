'use client';

import { UserField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CurrencyDollarIcon,
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createUser } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-surface-light dark:bg-surface-dark p-4 md:p-6">
        {/* User Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Namn
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter new users name"
                className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm outline-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                aria-describedby='username-error'
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
            </div>
          </div>
        </div>

        {/* User Nickname */}
        <div className="mb-4">
          <label htmlFor="nickname" className="mb-2 block text-sm font-medium">
            Smeknamn
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="Enter new users nickname"
                className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm outline-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                aria-describedby='username-error'
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
            </div>
          </div>
        </div>

        {/* User Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Titel
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter new users title"
                className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm outline-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                aria-describedby='username-error'
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
            </div>
          </div>
        </div>

        {/* User Password */}
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Lösenord
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter new users password"
                className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm outline-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                aria-describedby='password-error'
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
            </div>
          </div>
        </div>

        {/* User Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter new users email"
                className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm outline-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                aria-describedby='email-error'
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
            </div>
          </div>
        </div>

        {/* User Balance */}
        <div className="mb-4">
          <label htmlFor="balance" className="mb-2 block text-sm font-medium">
            Saldo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="balance"
                name="balance"
                type="number"
                step="1"
                placeholder="Enter new users balance"
                className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm outline-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                aria-describedby='invoice-error'
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
            </div>
          </div>
        </div>

        {/* User Role */}
        <div className="mb-4">
          <label htmlFor="role" className="mb-2 block text-sm font-medium">
            Roll
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="role"
                name="role"
                className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-sm outline-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              >
                {["Killing", "Marskalk", "Qnekt", "WraQ", "Inaktiv", "Utesluten"].map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100"
                xmlns="https://www.w3.org/TR/SVG/"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* User Admin Status */}
        <div className="mb-4">
          <label htmlFor="admin" className="mb-2 block text-sm font-medium">
            Admin Status
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="admin"
                name="admin"
                className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-sm outline-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              >
                <option value="No">Inte Admin</option>
                <option value="Yes">Admin</option>
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100"
                xmlns="https://www.w3.org/TR/SVG/"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/admin/users"
          className="flex h-10 items-center rounded-lg bg-surface-light dark:bg-surface-dark px-4 text-sm font-medium text-text-light dark:text-text-dark transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Avbryt
        </Link>
        <Button type="submit">Skapa Användare</Button>
      </div>
    </form>
  );
}
