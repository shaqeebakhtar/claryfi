import { Button } from '@/components/ui/button';
import { ReplyIcon, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import PostReply from './post-reply';
import { Reply as TReply } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReply } from '@/data-access/reply';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

type ReplyProps = {
  reply: TReply;
  commentId: string;
};

const Reply = ({ reply, commentId }: ReplyProps) => {
  const { slug, feedbackId } = useParams() as {
    slug: string;
    feedbackId: string;
  };
  const [isCommentor, setIsCommentor] = useState(false);
  const [showPostReply, setShowPostReply] = useState(false);

  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const deleteReplyMutation = useMutation({
    mutationFn: deleteReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', feedbackId] });
    },
  });

  useEffect(() => {
    setIsCommentor(reply.userId === session?.user?.id);
  }, [session?.user, reply]);

  return (
    <li className="list-none space-y-3 pl-6 sm:pl-14 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-full bg-muted grid place-items-center font-semibold text-muted-foreground text-sm select-none">
            HO
          </div>
          <div className="space-y-0.5">
            <h4 className="font-semibold max-w-24 truncate">John Doe</h4>
            <p className="text-xs text-muted-foreground font-semibold">
              {formatDistance(new Date(reply.createdAt), new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div className="space-x-3">
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
                deleteReplyMutation.mutate({
                  slug,
                  feedbackId,
                  replyId: reply.id,
                  commentId,
                })
              }
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground sm:ml-14">
        <span className="text-primary font-bold">@{reply.replyTo}</span>{' '}
        {reply.content}
      </p>
      {showPostReply && (
        <PostReply
          commentId={commentId}
          replyTo={reply.userId}
          hidePostReply={() => setShowPostReply(false)}
        />
      )}
    </li>
  );
};

export default Reply;
