import { Skeleton } from '@/components/ui/skeleton';
import { type Board } from '@prisma/client';
import { ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import CopyLinkButton from '@/components/copy-link-button';

type BoardCardProps = {
  board: Board & {
    _count: {
      feedbacks: number;
    };
  };
};

const BoardCard = ({ board }: BoardCardProps) => {
  return (
    <Link
      href={`/b/${board.slug}/admin`}
      className="p-6 bg-background rounded-lg shadow transition-all hover:shadow-md relative flex flex-col justify-between space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-green-50 rounded-full text-center font-medium uppercase grid items-center text-green-600 select-none">
            {board.name.slice(0, 2)}
          </div>
          <div>
            <h2 className="max-w-48 truncate text-base md:text-lg font-semibold leading-5">
              {board.name}
            </h2>
            <p className="text-muted-foreground max-w-48 truncate">
              {board.slug}
            </p>
          </div>
        </div>
        <CopyLinkButton value={`/b/${board.slug}`} />
      </div>
      <div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <ThumbsUp className="w-4 h-4" />
          <span className="whitespace-nowrap text-sm">
            {board._count.feedbacks} feedback
            {board._count.feedbacks !== 1 && 's'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BoardCard;

export const BoardCardSkeleton = () => {
  return (
    <div className="p-6 bg-background rounded-lg shadow relative flex flex-col justify-between space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Skeleton className="w-11 h-11 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="w-48 truncate h-5" />
            <Skeleton className="w-40 truncate h-4" />
          </div>
        </div>
        <Skeleton className="w-9 h-9 rounded-full" />
      </div>
      <div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="w-24 h-5" />
        </div>
      </div>
    </div>
  );
};
