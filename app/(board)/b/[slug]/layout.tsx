import UserProfileDropdown from '@/components/user-profile-dropdown';
import Link from 'next/link';
import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const boardName = 'Claryfi';

  return (
    <>
      <header className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
        <div className="flex h-16 items-center justify-between py-3 mx-auto w-full max-w-screen-lg px-3 lg:px-20">
          <div className="flex items-center gap-8">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-primary/10 text-primary rounded-full text-center text-sm font-medium uppercase grid items-center select-none">
                {boardName.slice(0, 2)}
              </div>
              <h2 className="max-w-48 truncate font-semibold leading-5">
                {boardName}
              </h2>
            </div>
            <ul className="flex items-center">
              <li>
                <Link
                  href={'/feedbacks'}
                  className="cursor-pointer text-sm font-medium text-muted-foreground px-3 py-2 rounded-md hover:text-black hover:bg-muted"
                >
                  Feedbacks
                </Link>
              </li>
              <li>
                <Link
                  href={'/roadmap'}
                  className="cursor-pointer text-sm font-medium text-muted-foreground px-3 py-2 rounded-md hover:text-black hover:bg-muted"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          <UserProfileDropdown />
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
