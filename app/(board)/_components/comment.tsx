import { Button } from '@/components/ui/button';
import { deleteComment } from '@/data-access/comment';
import { Comment as TComment } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReplyIcon, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { formatDistance, subDays } from 'date-fns';

const Comment = ({ comment }: { comment: TComment }) => {
  const { slug, feedbackId } = useParams() as {
    slug: string;
    feedbackId: string;
  };

  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', feedbackId] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <li className="pt-6 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-full bg-muted grid place-items-center font-semibold text-muted-foreground text-sm">
            HO
          </div>
          <div className="space-y-0.5">
            <h4 className="font-semibold">John Doe</h4>
            <p className="text-xs text-muted-foreground font-semibold">
              {formatDistance(new Date(comment.createdAt), new Date(), {
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
          >
            <ReplyIcon className="w-4 h-4 mr-1.5" strokeWidth={2.5} />
            Reply
          </Button>
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
        </div>
      </div>
      <p className="text-sm text-muted-foreground sm:ml-14">
        {comment.content}
      </p>
    </li>
  );
};

export default Comment;
