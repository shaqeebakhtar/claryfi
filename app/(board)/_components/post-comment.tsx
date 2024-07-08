import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { postComment } from '@/data-access/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const PostComment = () => {
  const { slug, feedbackId } = useParams() as {
    slug: string;
    feedbackId: string;
  };
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const postCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      setCommentError(null);
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['comments', feedbackId] });
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!comment) {
      setCommentError("Comment can't be empty.");
      return;
    } else {
      postCommentMutation.mutate({ slug, feedbackId, content: comment });
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-background rounded-xl shadow space-y-4">
      <h3 className="font-semibold text-base md:text-lg">Post Comment</h3>
      <form method="POST" onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-1">
          <Textarea
            className="shadow-none bg-muted/70 font-medium min-h-24 max-h-40 p-3"
            placeholder="Add your response"
            maxLength={255}
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
          />
          {commentError && !comment && (
            <p className="text-sm font-medium text-destructive">
              {commentError}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground break-words">
            {255 - comment.length} characters left
          </span>
          <Button
            size={'lg'}
            type="submit"
            disabled={postCommentMutation.isPending}
          >
            {postCommentMutation.isPending && (
              <Loader className="w-4 h-4 mr-1.5 animate-spin" />
            )}
            Post Comment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostComment;

export const PostCommentSkeleton = () => {
  return (
    <div className="p-6 sm:p-8 bg-background rounded-xl shadow space-y-4">
      <Skeleton className="w-32 h-6" />

      <div className="space-y-5">
        <div className="space-y-1">
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-48 h-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
