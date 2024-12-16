import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { IComment } from '@/types/comment';
import { formatDistance } from 'date-fns';
import { ThumbsUpIcon, UserRound } from 'lucide-react';

const Comment = ({ comment }: { comment: IComment }) => {
  return (
    <div>
      <div className="flex items-start space-x-3">
        <Avatar className="size-8 rounded-full">
          <AvatarImage src={comment?.user?.image as string} />
          <AvatarFallback>
            <UserRound className="size-4 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1 flex-1">
          <div className="flex items-center space-x-2 mt-1.5">
            <span className="text-sm text-foreground font-medium">
              {comment?.user?.name || 'Anonymous'}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDistance(
                new Date(comment?.createdAt as Date),
                new Date(),
                {
                  addSuffix: true,
                }
              )}
            </span>
          </div>
          <div className="space-y-2 5">
            <p
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: comment?.content as string,
              }}
            ></p>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                className="rounded-full px-2.5 h-6 shadow-none text-muted-foreground"
                variant="outline"
              >
                <ThumbsUpIcon className="size-3 mr-1" />
                25
              </Button>
              <Button
                size="sm"
                variant="link"
                className="hover:no-underline text-muted-foreground"
              >
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;

export const CommentSkeleton = () => {
  return (
    <li className="pt-6 space-y-2 list-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Skeleton className="w-10 h-10 rounded-full" />

          <div className="space-y-0.5">
            <Skeleton className="w-16 h-5" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
        <div className="flex space-x-3">
          <Skeleton className="w-16 h-8" />
          <Skeleton className="w-10 h-8" />
        </div>
      </div>
      <Skeleton className="w-full sm:w-[calc(100%-56px)] h-4 sm:ml-14" />
      <Skeleton className="w-1/2 h-4 sm:ml-14" />
    </li>
  );
};
