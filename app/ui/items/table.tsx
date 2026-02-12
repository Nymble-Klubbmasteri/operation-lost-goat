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
        <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-2">
          <table className="min-w-full text-gray-900 dark:text-gray-100">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium">
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
            <tbody>
              {items?.map((item) => (
                <tr
                  key={item.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&>td]:bg-white [&>td]:dark:bg-gray-800 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-5 px-3 pl-4">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap py-5 px-3 pl-4">
                    {item.price}
                  </td>
                  <td className="whitespace-nowrap py-5 px-3 pl-4">
                    {item.price_l2}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 pl-4">
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
