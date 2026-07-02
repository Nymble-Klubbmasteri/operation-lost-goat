import { fetchBalanceByID, getNumStreckUser, getSwishNumber } from '@/app/lib/data';

export default async function SaldoBox({ id, role }: { id: string, role: string }) {
  const balance = await fetchBalanceByID(id);
  const num_streck = await getNumStreckUser(id);

  if (!balance) {
    return (
      <div>
        Hittade inte ditt saldo...
      </div>
    );
  }

  if (!num_streck) {
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

  const swishNumber = sn?.value ?? '';
  const swishData = swishNumber
    ? `C${swishNumber};200;${encodeURIComponent('streck')};6`
    : '';

  const swishUrl = swishData
    ? `swish://payment?data=${encodeURIComponent(swishData)}`
    : '#';

  return (
    <div className="p-4 border rounded-lg shadow-md bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark w-64 text-center">
      <p className="text-lg font-semibold">Strecka av dig till: </p>
      {swishNumber ? (
        <a
          href={swishUrl}
          className="text-lg font-semibold underline underline-offset-4 hover:opacity-80"
        >
          {swishNumber}
        </a>
      ) : (
        <p className="text-lg font-semibold">Laddar...</p>
      )}
      <p className="text-lg font-semibold">Ditt Saldo:</p>
      <p className="text-xl font-bold mt-2">{balance.balance !== null ? `${balance.balance} kr` : "Laddar..."}</p>
      <p className="text-lg font-semibold">Antal Streck:</p>
      <p className="text-xl font-bold mt-2">{num_streck.streck_count !== null ? `${num_streck.streck_count} st` : "Laddar..."}</p>
    </div>
  );
}
