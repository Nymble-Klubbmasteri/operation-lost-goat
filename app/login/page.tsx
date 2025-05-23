import NKMLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Login',
};
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 dark:bg-blue-600 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <NKMLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
