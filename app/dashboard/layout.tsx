import SideNav from '@/app/ui/dashboard/sidenav';
import { auth } from '@/auth';
import { lusitana } from '../ui/fonts';
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user?.id) {
    // console.log();
    // console.log("Session", session);
    // console.log("User", session?.user);
    // console.log("ID", session?.user?.id);
    return (
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        ERROR: SESSION
      </h1>
    );
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav role={session.user.role} admin={session.user.admin}/>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}