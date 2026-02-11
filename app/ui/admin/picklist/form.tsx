'use client';

import {
  AdjustmentsHorizontalIcon,
  CheckIcon,
  ClipboardIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { createPicklistItem, updatePicklistItem } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { PicklistItem } from '@/app/lib/definitions';
import { itemTypeToString } from '@/app/lib/utils';
import { useState } from 'react';
import { DeleteItem } from './buttons';

const item_types = [0, 1, 2, 3, 4, 5];

export function CreateForm({
  event_id,
  items,
  picklist
}: {
  event_id: string;
  items: { id: number; type: number; name: string; }[];
  picklist: PicklistItem[];
}) {
  const initialState = { message: null, errors: {} };
  const [_, dispatch] = useFormState(createPicklistItem.bind(null, event_id), initialState);
  const [item_type, changeItemType] = useState<number | null>(null)

  return <form action={dispatch} className="flex flex-row gap-2 items-center">
    <div className="relative">
      <select
        onChange={(e) => changeItemType(e.target.value != "" ? parseInt(e.target.value) : null)}
        className="peer block w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
      >
        <option value="" selected>
          Filtrera efter typ
        </option>
        {item_types.map((item_type) => (
          <option key={item_type} value={item_type}>
            {itemTypeToString(item_type)}
          </option>
        ))}
      </select>
      <AdjustmentsHorizontalIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
    </div>
    <div className="relative">
      <select
        id="item_id"
        name="item_id"
        required
        className="peer block w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2"
      >
        <option value="" selected disabled>
          Välj från sortiment
        </option>
        {items.map((item) => (
          (item_type == null || item.type == item_type) && !picklist.map((picklist_item) => (picklist_item.item_id)).includes(item.id) &&
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <AdjustmentsHorizontalIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
    </div>
    <div className="relative">
      <input
        type="number"
        step="1"
        min="1"
        id="count"
        name="count"
        placeholder="Ange antal..."
        className="peer block w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
      />
      <ClipboardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
    </div>
    <button
      type="submit"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <PlusIcon className="h-5" />
    </button>
  </form>;
}

export function UpdateRowForm({ event_id, item_id }: { event_id: string; item_id: number }) {
  const initialState = { message: null, errors: {} };

  const updateItemWithId = updatePicklistItem.bind(null, event_id, item_id);
  const [_, dispatch] = useFormState(updateItemWithId, initialState);
  return <form action={dispatch} id={item_id.toString()}></form>
}

export function UpdateRowFormInput({ event_id, item }: { event_id: string; item: PicklistItem }) {
  const [changed, setChanged] = useState(false)
  return <tr
    key={item.item_id}
    className="w-full border-b py-3 text-sm last-of-type:border-none"
  >
    <td className="whitespace-nowrap py-3 pl-6">
      {item.name}
    </td>
    <td className="whitespace-nowrap py-3">
      <div className="relative">
        <input
          onChange={(_) => setChanged(true)}
          form={item.item_id.toString()}
          defaultValue={item.count}
          type="number"
          step="1"
          min="1"
          id="count"
          name="count"
          placeholder="Ange antal..."
          className="peer block w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
        <ClipboardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
      </div>
    </td>
    <td className="whitespace-nowrap py-3 pr-3">
      <div className="flex justify-end gap-3">
        <button
          form={item.item_id.toString()}
          type="submit"
          onClick={() => setChanged(false)}
          className={`${changed ? '' : 'invisible'} flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700`}
        >
          <CheckIcon className="w-5" />
        </button>
        <DeleteItem event_id={event_id} item_id={item.item_id} />
      </div>
    </td>
  </tr>;
}
