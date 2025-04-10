import { PencilIcon } from '@heroicons/react/24/outline';
import { strecka } from '@/app/lib/actions';
import flattis from '@/app/icons/favicon.ico'
import Image from 'next/image';
// wiiii


export function Strecka({ id, role }: { id: string, role: string}) {
  const streckaID = strecka.bind(null, id);

  if (role === "Killing" || role === "Inaktiv") {
    return (
      <div>
        Du har inte rätt att strecka
      </div>
    )
  }

  return (
    <form action={streckaID}>
      <button className='flex h-16 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
        <span className="hidden md:block mr-4 text-lg">Strecka</span>{' '}
        <Image
        src={flattis}
        className="mr-2 flex"
        width={60}
        height={60}
        alt='.'
      />
      </button>
    </form>
    
  );
}
