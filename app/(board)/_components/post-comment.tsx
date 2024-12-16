import { TextEditor } from '@/components/text-editor';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { postComment } from '@/services/comment';
import { postCommentSchema } from '@/validations/comment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const PostComment = ({ feedbackId }: { feedbackId: string }) => {
  const queryClient = useQueryClient();
  const { slug } = useParams() as {
    slug: string;
  };

  const form = useForm<z.infer<typeof postCommentSchema>>({
    resolver: zodResolver(postCommentSchema),
    defaultValues: {
      comment: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      toast.success('Your comment has been added');
      queryClient.invalidateQueries({ queryKey: ['feedback', feedbackId] });
    },
    onError: () => {
      toast.error('Failed to post your comment');
    },
  });

  const onSubmit = (data: z.infer<typeof postCommentSchema>) => {
    mutate({ slug, feedbackId, content: data.comment });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-end space-y-2 px-6 py-5"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <TextEditor
                  placeholder="Add a comment..."
                  className={
                    '[&>.tiptap]:bg-transparent [&>.tiptap]:border [&>.tiptap]:border-input [&>.tiptap]:rounded-sm [&>.tiptap]:min-h-28 [&>.tiptap]:max-h-40 [&>.tiptap]:overflow-y-auto [&>.tiptap]:px-3 [&>.tiptap]:py-2 [&>.tiptap]:text-sm break-all'
                  }
                  {...field}
                  form={form}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="sm"
          disabled={isPending || form.watch('comment') === ''}
        >
          {isPending && <Loader className="w-4 h-4 mr-1.5 animate-spin" />}
          Post
        </Button>
      </form>
    </Form>
  );
};

export default PostComment;

export const PostCommentSkeleton = () => {
  return (
    <div className="flex flex-col items-end space-y-2 px-6 py-5">
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-28" />
      <Skeleton className="w-12 h-8" />
    </div>
  );
};
