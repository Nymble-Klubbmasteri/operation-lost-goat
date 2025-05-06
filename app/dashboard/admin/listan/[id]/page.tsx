import { fetchUserById, fetchUserLogs, fetchUserStrecks } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts';
import { removeStreck } from '@/app/lib/actions';
import { DeleteStreckButton } from '@/app/ui/admin/accounting/buttons';


export const metadata: Metadata = {
  title: 'User Balance Logs',
};


 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const user = await fetchUserById(id);
    const session = await auth();
  
    if (!session?.user.role) {
      return (
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Du har ingen roll! :(
        </h1>
      );
    }
  
    if (session.user.admin !== 'Yes') {
      return (
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Du är inte admin!
        </h1>
      );
    }
  
    if (!user) {
      notFound();
    }
  
    const [user_logs, user_streck] = await Promise.all([
      fetchUserLogs(id),
      fetchUserStrecks(id)
    ]);

    const combined = [
        ...user_logs.map((l: any) => ({
          id: l.id,
          time: new Date(l.time),
          amount: l.value,
          type: 'Logg',
          message: l.message || 'Insättning / Ändring',
          admin: l.admin_name || 'Okänd admin',
        })),
        ...user_streck.map((s: any) => ({
          id: s.id,
          time: new Date(s.time),
          amount: -s.amount,
          type: 'Streck',
          message: 'Streck (avdrag)',
          admin: null,
        }))
      ];
      
      // Sort by time descending
      combined.sort((a, b) => b.time.getTime() - a.time.getTime());
  
    return (
      <main className="p-4">
        <h2 className="text-xl font-semibold mt-4 mb-2">Saldohistorik</h2>
        <table className="min-w-full text-left border">
            <thead className="bg-gray-100">
                <tr>
                <th className="px-4 py-2 border">Datum</th>
                <th className="px-4 py-2 border">Typ</th>
                <th className="px-4 py-2 border">Meddelande</th>
                <th className="px-4 py-2 border">Belopp</th>
                <th className="px-4 py-2 border">Admin</th>
                </tr>
            </thead>
            <tbody>
            {combined.map((entry) => (
              <tr key={entry.id}>
                <td className="px-4 py-2 border">{entry.time.toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{entry.type}</td>
                <td className="px-4 py-2 border">{entry.message}</td>
                <td className={`px-4 py-2 border ${entry.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {entry.amount > 0 ? '+' : ''}{entry.amount} kr
                </td>
                <td className="px-4 py-2 border">
                  {entry.admin ?? '-'}
                  {entry.type === 'Streck' && (
                    <DeleteStreckButton id={entry.id}/>
                  )}
                </td>
              </tr>
            ))}
            </tbody>
        </table>
      </main>
    );
  }