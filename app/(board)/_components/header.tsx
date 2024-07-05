'use client';
import CopyLinkButton from '@/components/copy-link-button';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import UserProfileDropdown from '@/components/user-profile-dropdown';
import { getBoardDetailsBySlug } from '@/data-access/board';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect, useParams, usePathname } from 'next/navigation';

const AdminDashboardHeader = () => {
  const pathname = usePathname();
  const { slug } = useParams() as { slug?: string };

  const { user, isLoaded: userLoaded } = useUser();

  if (!user && userLoaded) {
    redirect(`/login?next=/b/${slug}/admin`);
  }

  const { data: boardName, isPending } = useQuery({
    queryKey: ['board-details', slug],
    queryFn: () => getBoardDetailsBySlug({ slug: slug as string }),
  });

  const tabs = [
    { name: 'Feedbacks', href: `/b/${slug}/admin` },
    { name: 'Settings', href: `/b/${slug}/admin/settings` },
  ];

  if (!isPending && !boardName) {
    return notFound();
  }

  return (
    <header className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={'/dashboard'} className="hidden sm:block">
              <span className="font-bold">Claryfi</span>
            </Link>
            <span className="text-2xl text-gray-300 select-none font-extralight hidden sm:block">
              /
            </span>
            {isPending ? (
              <BoardNameSkeleton />
            ) : (
              boardName && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-9 h-9 bg-green-50 rounded-full text-center text-sm font-medium uppercase grid items-center text-green-600 select-none">
                      {boardName.name.slice(0, 2)}
                    </div>
                    <h2 className="max-w-48 truncate font-semibold leading-5">
                      {boardName.name}
                    </h2>
                  </div>
                  <div className="space-x-3 ml-2">
                    <CopyLinkButton value={`/b/${slug}`} />
                    <Link
                      target="_blank"
                      href={`/b/${slug}`}
                      className={cn(
                        buttonVariants({ variant: 'secondary', size: 'icon' }),
                        'rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all'
                      )}
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </>
              )
            )}
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
          {tabs.map((tab) => {
            return isPending ? (
              <NavTabSkeleton key={tab.href} />
            ) : (
              boardName && (
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
              )
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;

const BoardNameSkeleton = () => {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="w-9 h-9 rounded-full" />
      <Skeleton className="w-32 h-5" />
    </div>
  );
};

const NavTabSkeleton = () => {
  return <Skeleton className="w-28 h-7" />;
};
