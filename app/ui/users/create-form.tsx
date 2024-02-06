'use client';

import { UserField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createUser } from '@/app/lib/actions';
import { useFormState } from 'react-dom';



export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* User Name */}
        <div className="mb-4">
            <label htmlFor="username" className="mb-2 block text-sm font-medium">
                Name
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter new users name"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='username-error'
                    />
                    <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='email-error'
                    />
                    <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
            </div>
        </div>

        {/* User Balance */}
        <div className="mb-4">
            <label htmlFor="balance" className="mb-2 block text-sm font-medium">
                Balance
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="balance"
                        name="balance"
                        type="number"
                        step="1"
                        placeholder="Enter new users balance"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='invoice-error'
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
            </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/users"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create User</Button>
      </div>
    </form>
  );
}
