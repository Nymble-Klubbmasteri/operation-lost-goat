import { fetchStreckFilteredUsers } from '@/app/lib/data';
import { UpdateUser, DeleteUser } from '@/app/ui/admin/users/buttons';
import { ArrowDownIcon, PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { AdjustBalanceButton } from './buttons';
import { auth } from '@/auth';

export default async function UsersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  var users = (await fetchStreckFilteredUsers(query, currentPage))
  const session = await auth();
  if (!session?.user.id) {
    return (
      <div>
        <p>Du har inget id!</p>
      </div>
    )
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-2 md:pt-0">
          <div className="md:hidden">
            {users?.map((user) => (
              <div
                key={user.id}
                className="mb-2 w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="mb-2 flex items-center">
                    <p>{user.name}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {(user.balance)}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <UpdateUser id={user.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 dark:text-gray-100 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  User
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Balance
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Open</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {users?.map((user) => (
                <tr
                  key={user.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{user.name}</p>
                    </div>
                  </td>                
                  <td className="whitespace-nowrap px-3 py-3">
                    {(user.balance)}
                  </td>
                 
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <SeeUser id={user.id} admin_id={session.user.id!}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export function SeeUser({ id, admin_id }: { id: string, admin_id: string }) {
  return (
    <div className="flex gap-2">
      <Link
        href={`/dashboard/admin/listan/${id}`}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ArrowDownIcon className="w-5" />
      </Link>
      <AdjustBalanceButton userId={id} adminId={admin_id} />
    </div>
  );
}