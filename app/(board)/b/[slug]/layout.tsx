'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import UserProfileDropdown from '@/components/user-profile-dropdown';
import { cn, hextToHSL } from '@/lib/utils';
import { getPublicBoardBySlug } from '@/services/open/board';
import { useQuery } from '@tanstack/react-query';
import { LoaderIcon } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { notFound, useParams, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { slug } = useParams<{ slug: string }>();
  const [isGoogleSignin, setIsGoogleSignin] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const { data: board, isLoading } = useQuery({
    queryKey: ['board', 'open', slug],
    queryFn: () => getPublicBoardBySlug({ slug }),
  });

  useEffect(() => {
    if (!isLoading && board && board.brandColor) {
      const hsl = hextToHSL(board.brandColor);
      document.documentElement.style.setProperty('--primary', hsl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board?.brandColor]);

  const handleGoogleSingin = async () => {
    setIsGoogleSignin(true);
    await signIn('google', {
      callbackUrl: `${pathname}`,
    });
  };

  if (!board && !isLoading) {
    notFound();
  }

  return (
    <>
      <header className="sticky left-0 right-0 top-0 z-20 border-gray-200 bg-white shadow-sm">
        <div className="flex h-16 items-center justify-between py-3 mx-auto w-full max-w-screen-lg px-3 lg:px-10">
          {isLoading ? (
            <HeaderSkeleton />
          ) : (
            <div className="w-full flex items-center gap-8 justify-between">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg text-center text-sm font-medium uppercase grid items-center select-none">
                    {board?.name.slice(0, 2)}
                  </div>
                  <h2 className="max-w-48 truncate font-semibold leading-5">
                    {board?.name}
                  </h2>
                </div>
                <ul className="flex items-center gap-2">
                  <li>
                    <Link
                      href={`/b/${slug}`}
                      className={cn(
                        'cursor-pointer text-sm font-medium text-muted-foreground px-3 py-2 rounded-md hover:text-foreground transition-all',
                        pathname === `/b/${slug}` && 'bg-muted text-primary'
                      )}
                    >
                      Feedbacks
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/b/${slug}/roadmap`}
                      className={cn(
                        'cursor-pointer text-sm font-medium text-muted-foreground px-3 py-2 rounded-md hover:text-black transition-all',
                        pathname === `/b/${slug}/roadmap` &&
                          'bg-muted text-primary'
                      )}
                    >
                      Roadmap
                    </Link>
                  </li>
                </ul>
              </div>
              {!session?.user ? (
                <Button
                  variant="outline"
                  className="shadow-none"
                  disabled={isGoogleSignin}
                  onClick={handleGoogleSingin}
                >
                  {isGoogleSignin ? (
                    <LoaderIcon className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Icons.google className="w-4 h-4 mr-2" />
                  )}
                  SigIn with Google
                </Button>
              ) : (
                <UserProfileDropdown />
              )}
            </div>
          )}
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;

const HeaderSkeleton = () => {
  return (
    <div className="w-full lg:w-auto flex items-center gap-8 justify-between">
      <div className="flex items-center space-x-2">
        <Skeleton className="size-8 rounded-lg" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
};
