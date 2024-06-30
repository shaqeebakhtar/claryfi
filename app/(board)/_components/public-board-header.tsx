'use client';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import UserProfileDropdown from '@/components/user-profile-dropdown';
import { getBoardNameBySlug } from '@/data-access/board';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const PublicBoardHeader = () => {
  const { slug } = useParams() as { slug?: string };

  const { user, isLoaded: userLoaded } = useUser();

  const { data: boardName, isPending } = useQuery({
    queryKey: ['boardName', slug],
    queryFn: () => getBoardNameBySlug({ slug: slug as string }),
  });

  return (
    <header className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
        <div className="flex h-16 items-center justify-between py-3">
          {isPending ? (
            <BoardNameSkeleton />
          ) : (
            boardName && (
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-green-50 rounded-full text-center text-sm font-medium uppercase grid items-center text-green-600 select-none">
                  {boardName.name.slice(0, 2)}
                </div>
                <h2 className="max-w-48 truncate font-semibold leading-5">
                  {boardName.name}
                </h2>
              </div>
            )
          )}
          {userLoaded && user ? (
            <UserProfileDropdown />
          ) : (
            <div className="space-x-2">
              <Link
                href={`/login?next=/b/${slug}`}
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'hover:bg-muted px-8'
                )}
              >
                Login
              </Link>
              <Link
                href={`/register?next=/b/${slug}`}
                className={cn(buttonVariants({ variant: 'default' }), 'px-8')}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PublicBoardHeader;

const BoardNameSkeleton = () => {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="w-9 h-9 rounded-full" />
      <Skeleton className="w-32 h-5" />
    </div>
  );
};
