'use client';
import { PicklistItem } from '@/app/lib/definitions';

export default function Table({
  items,
}: {
    items:PicklistItem[];
}) {
  return (
    <div className="flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-surface-light dark:bg-surface-dark">
          <table className="min-w-full text-gray-900 dark:text-gray-100">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium">
                  Namn
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Antal
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item) => (
                <tr
                  key={item.item_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&>td]:bg-white [&>td]:dark:bg-gray-800 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-5 px-3 pl-4">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap py-5 px-3 pl-4">
                    {item.count}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
