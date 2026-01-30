import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { getTopListByYear } from '@/app/lib/data';
// wiiii

export default async function TopListByYear() {
  const top_list = await getTopListByYear();
  const tl_length = top_list.length;
  const current_year = new Date().getFullYear();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">High Score {current_year}</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 shadow-md rounded-lg">
          <thead className="bg-surface-light dark:bg-surface-dark">
            <tr className="border-b border-gray-400 dark:border-gray-500">
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark uppercase tracking-wider">Namn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark uppercase tracking-wider">Antal Streck</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark uppercase tracking-wider">Roll</th>
            </tr>
          </thead>
          <tbody>
            {tl_length > 0 ? (
              top_list.map((user) => (
                <tr key={user.id} className="border-t border-gray-300 dark:border-gray-600 first:border-t-0 bg-surface-light dark:bg-surface-dark hover:bg-surface-light dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span>{user.nickname}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.streck_count}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center text-text-light dark:text-text-dark">
                  No streck data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
