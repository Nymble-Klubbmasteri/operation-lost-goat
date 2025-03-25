'use client';

import { UserField, UserForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateUser } from '@/app/lib/actions';
import { useFormState } from 'react-dom';



export default function EditUserForm({
  user
}: {
  user: UserForm;
}) {
  const initialState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user.id);
  const [state, dispatch] = useFormState(updateUserWithId, initialState);
 
  return <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* User Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            User Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user.name}
                placeholder="Enter new users name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* User Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            User Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                defaultValue={user.email}
                placeholder="Enter users email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* User Password */}
        <div className="mb-4">
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Password
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        defaultValue={user.password}
                        placeholder="Enter new users password"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='password-error'
                    />
                    <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
            </div>
        </div>

        {/* User Balance */}
        <div className="mb-4">
          <label htmlFor="balance" className="mb-2 block text-sm font-medium">
            Choose a balance
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="balance"
                name="balance"
                type="number"
                defaultValue={user.balance}
                placeholder="Enter SEK amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* User Email */}
        <div className="mb-4">
          <label htmlFor="role" className="mb-2 block text-sm font-medium">
            User Role
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="role"
                name="role"
                type="text"
                defaultValue={user.role}
                placeholder="Enter users role"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* User Admin Status */}
        <div className="mb-4">
          <label htmlFor="admin" className="mb-2 block text-sm font-medium">
            User Admin Status
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="admin"
                name="admin"
                type="text"
                defaultValue={user.admin}
                placeholder="Enter users admin status"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
        <Button type="submit">Edit User</Button>
      </div>
    </form>
}
