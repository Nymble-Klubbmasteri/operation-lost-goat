import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { fetchBalanceByID, getTopList, getTopListByYear } from '@/app/lib/data';
// wiiii


export default async function TopListByYear() {
  const top_list = await getTopListByYear();
  const tl_length = top_list.length;
  const current_year = new Date().getFullYear();
  


    // console.log("balance is...:", balance.balance);
    return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">High Score {current_year}</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Namn</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Antal Streck</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tl_length > 0 ? (
                  top_list.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
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
                    <td className="px-6 py-4 text-center text-gray-500">
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
