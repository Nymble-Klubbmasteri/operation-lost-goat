'use client';

import { UserField, UserForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  HandThumbUpIcon,
  HandThumbDownIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateProfile } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import { useState } from 'react';



export default function EditProfileForm({
  user
}: {
  user: UserForm;
}) {
  const initialState = { message: null, errors: {} };
  const updateUserWithId = updateProfile.bind(null, user.id);
  const [state, dispatch] = useFormState(updateUserWithId, initialState);

  const [nicePreview, setNicePreview] = useState(user.image_nice_url || "/users/evil-rabbit.png");
  const [chaoticPreview, setChaoticPreview] = useState(user.image_chaotic_url || "/users/evil-rabbit.png");

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>, setPreview: Function) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // console.log("user (edit profile form):", user);
  // if (user.image_nice_url) {
  //   console.log("user nice image url:", user.image_nice_url);
  // }
  // if (user.image_chaotic_url) {
  //   console.log("user chaotic image url:", user.image_chaotic_url);
  // }

  // console.log("edit profile role:", user.role);
  // console.log("edit profile name:'", user.name, "'");
  // console.log("state:", state);


 
  return (
    <>
      {state?.message && (
        <div className="mb-4 rounded-md bg-green-100 p-4 text-sm text-green-800 border border-green-300">
          {state.message}
        </div>
      )}
      <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
                defaultValue={user.name}
                placeholder="Enter new users name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                defaultValue={user.nickname}
                placeholder="Enter users nickname"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                Lösenord
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        defaultValue={user.password}
                        placeholder="lösenord"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby='password-error'
                        minLength={6}
                    />
                    <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
                {/* <div id="password-error" aria-live="polite" aria-atomic="true">
                {state.errors?.password &&
                  state.errors.password.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                ))}
                </div> */}
            </div>
        </div>

        {/* User Likes */}
        <div className="mb-4">
          <label htmlFor="likes" className="mb-2 block text-sm font-medium">
            Gillar:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="likes"
                name="likes"
                type="text"
                defaultValue={user.likes}
                placeholder="Vad gillar du?"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <HandThumbUpIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* User DisLikes */}
        <div className="mb-4">
          <label htmlFor="dislikes" className="mb-2 block text-sm font-medium">
            Ogillar:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="dislikes"
                name="dislikes"
                type="text"
                defaultValue={user.dislikes}
                placeholder="Vad ogillar du?"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <HandThumbDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Profile Images */}
        <div className="mb-4">
          <h2 className="mb-2 block text-sm font-medium">Dina Profilbilder</h2>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <p className="text-xs mb-1 text-gray-600">Fin</p>
              <Image
                src={user.image_nice_url || "/users/evil-rabbit.png"}
                alt="Fin version"
                width={160}
                height={160}
                className="rounded-md border border-gray-300"
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs mb-1 text-gray-600">Kaotisk</p>
              <Image
                src={user.image_chaotic_url || "/users/evil-rabbit.png"}
                alt="Kaotisk version"
                width={160}
                height={160}
                className="rounded-md border border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Upload New Images */}
        <div className="mb-4">
          <h2 className="mb-2 block text-sm font-medium">Ladda upp nya profilbilder</h2>
          <div className="flex gap-4">
            {/* Nice image upload */}
            <div className="flex flex-col items-center">
              <label className="text-xs mb-1 text-gray-600">Fin</label>
              <Image
                src={nicePreview}
                alt="Nice preview"
                width={80}
                height={80}
                className="rounded-md border border-gray-300"
              />
              <input
                id="image_nice"
                type="file"
                name="image_nice"
                accept="image/*"
                onChange={(e) => handlePreview(e, setNicePreview)}
                className="mt-2 text-xs"
              />
            </div>

            {/* Chaotic image upload */}
            <div className="flex flex-col items-center">
              <label className="text-xs mb-1 text-gray-600">Kaotisk</label>
              <Image
                src={chaoticPreview}
                alt="Chaotic preview"
                width={80}
                height={80}
                className="rounded-md border border-gray-300"
              />
              <input
                id="image_chaotic"
                type="file"
                name="image_chaotic"
                accept="image/*"
                onChange={(e) => handlePreview(e, setChaoticPreview)}
                className="mt-2 text-xs"
              />
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">Spara ändringar</Button>
      </div>
    </form>
    </>
  );
}


