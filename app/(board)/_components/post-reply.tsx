import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { postReply } from '@/data-access/reply';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

type PostReplyProps = {
  commentId: string;
  replyTo: string;
  hidePostReply: () => void;
};

const PostReply = ({ commentId, replyTo, hidePostReply }: PostReplyProps) => {
  const { slug, feedbackId } = useParams() as {
    slug: string;
    feedbackId: string;
  };
  const [reply, setReply] = useState('');
  const [replyError, setReplyError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const postReplyMutation = useMutation({
    mutationFn: postReply,
    onSuccess: () => {
      hidePostReply();
      setReply('');
      queryClient.invalidateQueries({ queryKey: ['comments', feedbackId] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!reply) {
      setReplyError("Reply can't be empty.");
      return;
    } else {
      postReplyMutation.mutate({
        slug,
        feedbackId,
        commentId,
        replyTo,
        content: reply,
      });
    }
  };

  return (
    <div className="pt-2 sm:ml-14">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-end sm:flex-row sm:items-start gap-4"
      >
        <div className="space-y-1 w-full">
          <Textarea
            className="shadow-none bg-muted/70 font-medium resize-none min-h-24 p-3"
            placeholder="Add your reply"
            maxLength={255}
            value={reply}
            onChange={(e) => setReply(e.currentTarget.value)}
          />
          {replyError && !reply && (
            <p className="text-sm font-medium text-destructive">{replyError}</p>
          )}
        </div>
        <Button
          size={'lg'}
          type="submit"
          disabled={postReplyMutation.isPending || !reply}
        >
          {postReplyMutation.isPending && (
            <Loader className="w-4 h-4 mr-1.5 animate-spin" />
          )}
          Post Reply
        </Button>
      </form>
    </div>
  );
};

export default PostReply;
