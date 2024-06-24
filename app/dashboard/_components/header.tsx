import Link from 'next/link';
import UserProfileDropdown from '@/components/user-profile-dropdown';

const Header = () => {
  return (
    <header className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={'/dashboard'}>
              <span className="font-bold">Claryfi</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="#"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
              target="_blank"
            >
              Share feedback
            </Link>
            <UserProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
