'use client';

import {
  ClipboardIcon,
  CurrencyDollarIcon,
  PlusIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { createOrUpdateItem } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { itemTypeToString } from '@/app/lib/utils';
import { Item } from '@/app/lib/definitions';
import { DeleteItem } from '@/app/ui/admin/items/buttons';
import { useState } from 'react';

const item_types = [0, 1, 2, 3, 4, 5];

export function CreateForm() {
  const initialState = { message: null, errors: {} };
  const [_, dispatch] = useFormState(createOrUpdateItem.bind(null, null), initialState);

  return <form action={dispatch} className="flex flex-row gap-2 justify-between items-center">
    <div className="relative">
      <input className="peer block w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400" type="text" id="name" name="name" placeholder="Ange namn..." />
      <ClipboardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
    </div>
    <div className="relative">
      <input className="peer block w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400" type="number" step="1" min="1" id="price" name="price" placeholder="Ange pris..." />
      <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
    </div>
    <div className="relative">
      <input className="peer block w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400" type="number" step="1" min="1" id="price_l2" name="price_l2" placeholder="Ange L2 pris..." />
      <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
    </div>
    <div className="relative">
      <select className="peer block w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400" id="type" name="type">
        <option value="" selected disabled>
          Välj typ av sortiment
        </option>
        {item_types.map((type) => (
          <option key={type} value={type}>
            {itemTypeToString(type)}
          </option>
        ))}
      </select>
      <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
    </div>
    <button type="submit" className="flex h-10 items-center rounded-lg bg-blue-600 px-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      <PlusIcon className="h-5" />
    </button>
  </form>;
}

export function UpdateRowForm({ id }: { id: number }) {
  const initialState = { message: null, errors: {} };

  const updateItemWithId = createOrUpdateItem.bind(null, id);
  const [_, dispatch] = useFormState(updateItemWithId, initialState);
  return <form action={dispatch} id={id.toString()}></form>
}

export function UpdateRowFormInput({ item }: { item: Item }) {
  const [changed, setChanged] = useState(false)
  return <tr
    key={item.id}
    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
  >
    <td className="whitespace-nowrap py-3 pl-6 pr-3">
      <div className="flex items-center gap-3">
        <div className="relative">
          <input onChange={(_) => setChanged(true)} form={item.id.toString()} defaultValue={item.name} className="peer block w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400" type="text" id="name" name="name" placeholder="Ange namn..." />
          <ClipboardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
        </div>
      </div>
    </td>
    <td className="whitespace-nowrap px-3 py-3">
      <div className="relative">
        <input onChange={(_) => setChanged(true)} form={item.id.toString()} defaultValue={item.price} className="peer block w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400" type="number" step="1" min="1" id="price" name="price" placeholder="Ange pris..." />
        <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
      </div>
    </td>
    <td className="whitespace-nowrap px-3 py-3">
      <div className="relative">
        <input onChange={(_) => setChanged(true)} form={item.id.toString()} defaultValue={item.price_l2} className="peer block w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400" type="number" step="1" min="1" id="price_l2" name="price_l2" placeholder="Ange L2 pris..." />
        <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
      </div>
    </td>
    <td className="whitespace-nowrap px-3 py-3">
      <div className="relative">
        <select onChange={(_) => setChanged(true)} form={item.id.toString()} defaultValue={item.type} className="peer block w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400" id="type" name="type">
          <option value="" disabled>
            Välj typ av sortiment
          </option>
          {item_types.map((type) => (
            <option key={type} value={type}>
              {itemTypeToString(type)}
            </option>
          ))}
        </select>
        <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
      </div>
    </td>
    <td className="whitespace-nowrap py-3">
      <div className="flex justify-end gap-3">
        <button
          form={item.id.toString()}
          type="submit"
          onClick={() => setChanged(false)}
          className={`${changed ? '' : 'invisible'} flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700`}
        >
          <CheckIcon className="w-5" />
        </button>
      </div>
    </td>
    <td className="whitespace-nowrap py-3 pr-3">
      <div className="flex justify-end gap-3">
        <DeleteItem id={item.id} />
      </div>
    </td>
  </tr>;
}
