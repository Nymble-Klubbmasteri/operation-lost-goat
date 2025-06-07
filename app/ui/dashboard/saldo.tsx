import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { fetchBalanceByID, getSwishNumber } from '@/app/lib/data';
import Link from 'next/link';
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

  if (role === "Killing" || role === "Inaktiv" || role === "Utesluten") {
    return (
      <div>
        
      </div>
    )
  }

  let sn = await getSwishNumber();

    // console.log("balance is...:", balance.balance);
  return (
    <div className="p-4 border rounded-lg shadow-md bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark w-64 text-center">
      <p className="text-lg font-semibold">Strecka av dig till: </p>
      {/* <Link href={`https://app.swish.nu/1/p/sw/?sw=`+sn?.value+`&amt=200&cur=SEK&msg=Lista&edit=amt,msg&src=url`}> */}
      <p className="text-lg font-semibold">{sn?.value ? sn.value : "Laddar..."}</p>
      {/* </Link> */}

      <p className="text-lg font-semibold">Ditt Saldo:</p>
      <p className="text-xl font-bold mt-2">{balance.balance !== null ? `${balance.balance} kr` : "Laddar..."}</p>
    </div>
  );
}
