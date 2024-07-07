'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { feedbackSchema } from '@/validations/feedback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateFeedback } from '@/data-access/feedback';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';
import { Feedback } from '@prisma/client';

type FeedbackDialogFormProps = {
  closeDialog: () => void;
  feedback: Feedback;
};

const EditFeedbackDialogForm = ({
  closeDialog,
  feedback,
}: FeedbackDialogFormProps) => {
  const { slug, feedbackId } = useParams() as {
    slug: string;
    feedbackId: string;
  };

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      title: feedback.title,
      description: feedback.description,
    },
  });

  const editFeedbackMutation = useMutation({
    mutationFn: updateFeedback,
    onSuccess: () => {
      closeDialog();
      toast.success('Your feedback has been updated');
      queryClient.invalidateQueries({ queryKey: ['feedback', feedbackId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: z.infer<typeof feedbackSchema>) => {
    editFeedbackMutation.mutate({
      slug,
      feedbackId,
      title: data.title,
      description: data.description,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-1">
                <FormLabel>Feedback Title</FormLabel>
                <FormControl>
                  <Input placeholder="Dark mode for blogs" {...field} />
                </FormControl>
              </div>
              <FormDescription>Add a short, descriptive title</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-1">
                <FormLabel>Feedback Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Needed dark mode for better readability and reduce eye strain"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormDescription>
                Explain in detail what should be improved, added, etc.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="sm:justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={editFeedbackMutation.isPending}>
            {editFeedbackMutation.isPending && (
              <Loader className="w-4 h-4 mr-1.5 animate-spin" />
            )}
            Update
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EditFeedbackDialogForm;
