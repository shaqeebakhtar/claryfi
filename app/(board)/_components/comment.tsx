import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { likeComment, undoLikeComment } from '@/services/comment';
import { IComment } from '@/types/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistance } from 'date-fns';
import { ThumbsUpIcon, UserRound } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Comment = ({ comment }: { comment: IComment }) => {
  const queryClient = useQueryClient();
  const { slug } = useParams<{ slug: string }>();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const feedbackId = searchParams.get('f');
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(comment.commentLikes.length);

  const likeCommentMutation = useMutation({
    mutationFn: likeComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback', feedbackId] });
    },
    onError: () => {
      toast.error('Failed to like');
      setLiked(!liked);
      setLikes((prev) => prev - 1);
    },
  });

  const undoLikeCommentMutation = useMutation({
    mutationFn: undoLikeComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback', feedbackId] });
    },
    onError: () => {
      toast.error('Failed to remove like');
    },
  });

  const handleLikeAndUndoLike = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!session?.user) {
      toast.info('You need to be logged in to like a comment');
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    if (liked) {
      setLikes((prev) => prev - 1);
      undoLikeCommentMutation.mutate({
        slug,
        feedbackId: feedbackId as string,
        commentId: comment.id,
      });
    } else {
      setLikes((prev) => prev + 1);
      likeCommentMutation.mutate({
        slug,
        feedbackId: feedbackId as string,
        commentId: comment.id,
      });
    }
  };

  useEffect(() => {
    const hasLiked = comment.commentLikes.some(
      (like) => like.likedBy === session?.user?.id
    );
    setLiked(hasLiked);
  }, [comment, session?.user?.id]);

  return (
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
            {formatDistance(new Date(comment?.createdAt as Date), new Date(), {
              addSuffix: true,
            })}
          </span>
        </div>
        <div className="space-y-2 5">
          <p
            className="text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: comment?.content as string,
            }}
          ></p>
          <Button
            size="sm"
            className={cn(
              'rounded-full px-2.5 h-6 shadow-none bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary',
              liked &&
                'bg-primary/20 text-primary hover:bg-muted hover:text-muted-foreground'
            )}
            onClick={handleLikeAndUndoLike}
          >
            <ThumbsUpIcon className={cn('size-3 mr-1')} />
            {likes}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comment;

export const CommentSkeleton = () => {
  return (
    <div className="flex items-start space-x-3">
      <Skeleton className="size-8 rounded-full" />
      <div className="space-y-1 flex-1">
        <div className="flex items-center space-x-2 mt-1.5">
          <Skeleton className="w-24 h-5" />
          <Skeleton className="w-20 h-4" />
        </div>
        <div className="space-y-2 5">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-1/2 h-5" />
          <Skeleton className="w-12 h-6 rounded-full" />
        </div>
      </div>
    </div>
  );
};
