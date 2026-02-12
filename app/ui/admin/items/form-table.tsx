import { fetchFilteredItems } from '@/app/lib/data';
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
        <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-2">
          {items?.map((item) => (
            <UpdateRowForm key={`form-${item.id}`} id={item.id} />
          ))}
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
