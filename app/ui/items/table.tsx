import { fetchFilteredItems } from '@/app/lib/data';
import { itemTypeToString } from '@/app/lib/utils';

export default async function Table({
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">{itemTypeToString(item.type)}</p>
                </div>
              </div>
            ))}
          </div>
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
                <tr
                  key={item.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{item.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{item.price}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{item.price_l2}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {itemTypeToString(item.type)}
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
