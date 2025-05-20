import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
 

export const metadata: Metadata = {
  title: {
    template: '%s | NKM Dashboard',
    default: 'NKM Dashboard',
  },
  description: 'NKMs Majestätiska Hemsida',
  // metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark`}>
        {children}
      </body>
      <Toaster position="top-center" />
    </html>
  );
}
