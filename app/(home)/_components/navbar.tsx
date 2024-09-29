import { buttonVariants } from '@/components/ui/button';
import UserProfileDropdown from '@/components/user-profile-dropdown';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-white sticky inset-x-0 top-0 z-[100] shadow-sm">
      <div className="h-16 flex gap-4 items-center justify-between max-w-screen-xl mx-auto px-3 lg:px-16">
        <Link href="/">
          <span className="flex items-center space-x-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
            >
              <rect width="30" height="30" fill="#111827" rx="4" />
              <path
                fill="#fff"
                d="M25 15a10 10 0 0 1-20 0h4a6 6 0 0 0 12 0h4Z"
              />
              <path fill="#fff" d="M17 17h-4V7h4z" />
              <path fill="#fff" d="M15 11V7h10v4z" />
            </svg>
            <span className="font-bold text-lg">Claryfi</span>
          </span>
        </Link>

        <div className="flex items-center space-x-2">
          {!session?.user ? (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'rounded-full px-6 h-9 hover:bg-gray-200'
                )}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'rounded-full px-6 h-9'
                )}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'rounded-full px-6 h-9 hover:bg-secondary mr-2'
                )}
              >
                Dashboard
              </Link>
              <UserProfileDropdown />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
