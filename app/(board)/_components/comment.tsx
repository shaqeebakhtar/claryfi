import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { deleteComment } from '@/data-access/comment';
import { generateBgColors } from '@/lib/utils';
import {
  Comment as TComment,
  Reply as TReply,
  User as TUser,
} from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistance } from 'date-fns';
import { ReplyIcon, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostReply from './post-reply';
import Reply from './reply';

type TReplyUser = TReply & {
  user: TUser;
};

const Comment = ({
  comment,
}: {
  comment: TComment & {
    replies: TReplyUser[];
    user: TUser;
  };
}) => {
  const [isCommentor, setIsCommentor] = useState(false);
  const [showPostReply, setShowPostReply] = useState(false);
  const { slug, feedbackId } = useParams() as {
    slug: string;
    feedbackId: string;
  };

  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', feedbackId] });
    },
  });

  useEffect(() => {
    setIsCommentor(comment.userId === session?.user?.id);
  }, [session?.user, comment]);

  const bgColor = generateBgColors(comment.user.email);

  return (
    <li className="pt-8 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className="w-10 h-10 rounded-full grid place-items-center font-semibold text-white text-sm select-none"
            style={{ background: bgColor }}
          >
            {comment.user.username && comment.user.username[0].toUpperCase()}
          </div>
          <div className="space-y-0.5">
            <h4 className="font-semibold max-w-24 lg:max-w-full truncate">
              {comment.user.username}
            </h4>
            <p className="text-xs text-muted-foreground font-semibold">
              {formatDistance(new Date(comment.createdAt), new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size={'sm'}
            variant={'ghost'}
            className="text-primary hover:bg-primary/10 font-bold"
            onClick={() => setShowPostReply(!showPostReply)}
          >
            <ReplyIcon className="w-4 h-4 mr-1.5" strokeWidth={2.5} />
            Reply
          </Button>
          {isCommentor && (
            <Button
              size={'sm'}
              variant={'ghost'}
              className="text-destructive hover:bg-destructive/10"
              onClick={() =>
                deleteCommentMutation.mutate({
                  slug,
                  feedbackId,
                  commentId: comment.id,
                })
              }
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground sm:ml-14">
        {comment.content}
      </p>
      {showPostReply && (
        <PostReply
          commentId={comment.id}
          replyTo={comment.user.username as string}
          hidePostReply={() => setShowPostReply(false)}
        />
      )}
      <ul className="relative before:absolute before:top-0 before:left-0.5 sm:before:left-4 before:w-[1px] before:h-full before:bg-muted">
        {comment.replies.map((reply) => (
          <Reply key={reply.id} reply={reply} commentId={comment.id} />
        ))}
      </ul>
    </li>
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
