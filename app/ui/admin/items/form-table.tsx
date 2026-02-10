import { fetchFilteredItems } from '@/app/lib/data';
import { itemTypeToString } from '@/app/lib/utils';
import { DeleteItem } from '@/app/ui/admin/items/buttons';
import { UpdateRowForm, UpdateRowFormInput } from './form';

export default async function FormTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const items = await fetchFilteredItems(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-2 md:pt-0">
          <div className="md:hidden">
            {items?.map((item) => (
              <div
                key={item.id}
                className="mb-2 w-full rounded-md bg-white dark:bg-gray-800 p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="mb-2 flex items-center">
                    <p>{item.name}</p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.price}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.price_l2}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{itemTypeToString(item.type)}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <DeleteItem id={item.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {items?.map((item) => (
            <UpdateRowForm key={`form-${item.id}`} id={item.id} />
          ))}
          <table className="hidden min-w-full text-gray-900 dark:text-gray-100 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Namn
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Pris
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  L2 Pris
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Typ
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {items?.map((item) => (
                <UpdateRowFormInput key={`input-${item.id}`} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
