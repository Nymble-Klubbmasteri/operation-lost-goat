import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { fetchBalanceByID, getFlipperCode, getNumStreckUser, getSkoldCode, getSwishNumber } from '@/app/lib/data';
import Link from 'next/link';
// wiiii

export default async function Flipper_kod({id, role}: { id: string, role: string}) {
 
    if (role === "Qnekt" || role === "Killing" || role === "Inaktiv" || role === "Utesluten") {
        return (
        <div>
        </div>
        );
    }
    
    let fk = await getFlipperCode();

    return (
        <div className="p-4 border rounded-lg shadow-md bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark w-64 text-center">
        <p className="text-lg font-semibold">Kod till Flipper: </p>
        <p className="text-lg font-semibold">{fk?.value ? fk.value : "Laddar..."}</p>
        </div>
    );
}
