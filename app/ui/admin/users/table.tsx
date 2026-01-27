import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { fetchBank, fetchFilteredUsers } from '@/app/lib/data';
import { UpdateUser, DeleteUser } from '@/app/ui/admin/users/buttons';
import { auth } from '@/auth';
import { lusitana } from '../../fonts';
import Link from 'next/link';

export default async function UsersTable({
  query,
  currentPage,
  sort,
  order,
}: {
  query: string;
  currentPage: number;
  sort: 'name' | 'role' | 'balance' | 'email';
  order: 'DESC' | 'ASC';
}) {
  const users = await fetchFilteredUsers(query, currentPage, sort, order);
  const bank = await fetchBank();

  const session = await auth();
  if (!session?.user.id) {
      return (
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Du har inget id!
      </h1>
      );
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-2 md:pt-0">
          <div className="md:hidden">
            {users?.map((user) => (
              <div
                key={user.id}
                className="mb-2 w-full rounded-md bg-white dark:bg-gray-800 p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="mb-2 flex items-center">
                    <p>{user.name}</p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {(user.balance)}
                    </p>
                    <p className="text-xl font-medium">
                      {(user.role)}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateUser id={user.id} />
                    <DeleteUser id={user.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 dark:text-gray-100 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  <Link
                    href={`?sort=name&order=${sort === 'name' && order === 'ASC' ? 'DESC' : 'ASC'}`}
                    className="flex items-center gap-1"
                  >
                    User
                    {sort === 'name' &&
                      (order === 'ASC' ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      ))}
                  </Link>
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <Link
                    href={`?sort=email&order=${sort === 'email' && order === 'ASC' ? 'DESC' : 'ASC'}`}
                    className="flex items-center gap-1"
                  >
                    Email
                    {sort === 'email' &&
                      (order === 'ASC' ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      ))}
                  </Link>
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <Link
                    href={`?sort=balance&order=${sort === 'balance' && order === 'ASC' ? 'DESC' : 'ASC'}`}
                    className="flex items-center gap-1"
                  >
                    Balance
                    {sort === 'balance' &&
                      (order === 'ASC' ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      ))}
                  </Link>
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <Link
                    href={`?sort=role&order=${sort === 'role' && order === 'ASC' ? 'DESC' : 'ASC'}`}
                    className="flex items-center gap-1"
                  >
                    Role
                    {sort === 'role' &&
                      (order === 'ASC' ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      ))}
                  </Link>
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
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
                    {user.email}
                  </td>                  
                  <td className="whitespace-nowrap px-3 py-3">
                    {(user.balance)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {(user.role)}
                  </td>

                  {/* <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={user.status} />
                  </td>  */}
                 
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateUser id={user.id} />
                      <DeleteUser id={user.id} />
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
