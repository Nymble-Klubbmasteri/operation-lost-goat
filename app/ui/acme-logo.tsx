import { lusitana } from '@/app/ui/fonts';
import logo from '@/public/nkm/skold.png';
import Image from 'next/image';
import Link from 'next/link';

export default function NKMLogo({ className }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center h-full overflow-hidden">
      <Image
        src={logo}
        className={className}
        width={100}
        height={100}
        alt="Nymble Klubbmästeri"
      />
    </Link>
  );
}
