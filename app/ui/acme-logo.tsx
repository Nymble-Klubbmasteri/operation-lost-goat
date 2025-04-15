import { lusitana } from '@/app/ui/fonts';
import logo from '@/public/nkm/skold.png';
import Image from 'next/image';
import Link from 'next/link';

export default function NKMLogo() {
  // return (
  //   <div
  //     className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
  //   >
  //     <p className="text-[35px]">Nymble Klubbmästeri</p>
  //   </div>
  // );
  // return (
  //   <div>
  //     <img src={logo} alt="Nymble Klubbmästeri" />  
  //   </div>
  // )
  return(
    <div>
      <Link href={'/'}>
        <Image
          src={logo}
          className="mr-2 flex items-center"
          width={100}
          height={100}
          alt='img'
        />
      </Link>

      <div className={`${lusitana.className} flex flex-row items-center leading-none text-white`}>
        <p className="tsxt-[50px]">Nymble Klubbmästeri</p>
      </div>
    </div>
  );
}
