import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { fetchBalanceByID, getSwishNumber } from '@/app/lib/data';
// wiiii


export default async function SaldoBox({ id, role }: { id: string, role: string}) {
  const balance = await fetchBalanceByID(id);

  if (!balance) {
    return (
      <div>
        Hittade inte ditt saldo...
      </div>
    );
  }

  if (role === "Killing" || role === "Inaktiv") {
    return (
      <div>
        Killingar har inget saldo...
      </div>
    )
  }

  let sn = await getSwishNumber();

    // console.log("balance is...:", balance.balance);
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white w-64 text-center">
      <p className="text-lg font-semibold">Strecka av dig till: {sn?.value ? sn.value : "Laddar..."}</p>

      <p className="text-lg font-semibold">Ditt Saldo:</p>
      <p className="text-xl font-bold mt-2">{balance.balance !== null ? `${balance.balance} kr` : "Laddar..."}</p>
    </div>
  );
}
