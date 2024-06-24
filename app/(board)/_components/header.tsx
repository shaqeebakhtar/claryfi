'use client';
import UserProfileDropdown from '@/components/user-profile-dropdown';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const AdminDashboardHeader = () => {
  const pathname = usePathname();
  const { slug } = useParams() as { slug?: string };

  const tabs = [
    { name: 'Feedbacks', href: `/b/${slug}/admin` },
    { name: 'Settings', href: `/b/${slug}/admin/settings` },
  ];

  return (
    <header className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={'/dashboard'}>
              <span className="font-bold">Claryfi</span>
            </Link>
            <span className="text-2xl text-gray-300 select-none font-extralight">
              /
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-green-50 rounded-full text-center text-sm font-medium uppercase grid items-center text-green-600 select-none">
                BO
              </div>
              <h2 className="max-w-48 truncate font-medium leading-5">
                Board name
              </h2>
            </div>
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
        <nav className="flex h-11 items-center space-x-2">
          {tabs.map((tab) => (
            <Link key={tab.href} className="relative" href={tab.href}>
              <div
                className={cn(
                  'm-1 rounded-sm px-2 md:px-3 py-1.5 transition-all duration-75 hover:bg-gray-100 text-muted-foreground hover:text-foreground text-sm',
                  (pathname === tab.href ||
                    (tab.href.endsWith('settings') &&
                      pathname?.startsWith(tab.href))) &&
                    'text-foreground font-medium'
                )}
              >
                {tab.name}
              </div>
              {(pathname === tab.href ||
                (tab.href.endsWith('settings') &&
                  pathname?.startsWith(tab.href))) && (
                <div className="absolute -bottom-0.5 w-full px-1.5">
                  <div className="h-0.5 bg-foreground" />
                </div>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;
