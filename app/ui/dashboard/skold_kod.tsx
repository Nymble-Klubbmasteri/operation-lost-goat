import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { fetchBalanceByID, getNumStreckUser, getSkoldCode, getSwishNumber } from '@/app/lib/data';
import Link from 'next/link';
// wiiii

export default async function Skold_Kod({id, role}: { id: string, role: string}) {
 
    if (role === "Qnekt" || role === "Inaktiv" || role === "Utesluten") {
        return (
        <div>
        </div>
        );
    }
    
    let sk = await getSkoldCode();

    return (
        <div className="p-4 border rounded-lg shadow-md bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark w-64 text-center">
        <p className="text-lg font-semibold">Kod till Skölden: </p>
        <p className="text-lg font-semibold">{sk?.value ? sk.value : "Laddar..."}</p>
        </div>
    );
}
