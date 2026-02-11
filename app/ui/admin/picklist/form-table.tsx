import { UpdateRowForm, UpdateRowFormInput } from './form';
import { PicklistItem } from '@/app/lib/definitions';

export default async function FormTable({
  event_id,
  picklist,
}: {
  event_id: string;
  picklist: PicklistItem[];
}) {
  return (
    <div className="flow-root">
      <div className="inline-block min-w-full">
        <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-2 md:pt-0">
          {picklist?.map((item) => (
            <UpdateRowForm key={`form-${item.item_id}`} event_id={event_id} item_id={item.item_id} />
          ))}
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
            <tbody className="bg-white dark:bg-gray-800">
              {picklist?.map((item) => (
                <UpdateRowFormInput key={`input-${item.item_id}`} event_id={event_id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
