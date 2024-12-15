'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { TextEditor } from '@/components/text-editor';
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
import { addPublicFeedback } from '@/services/open/feedback';
import { publicFeedbackSchema } from '@/validations/feedback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

type AddPublicFeedbackFormProps = {
  closeDialog: () => void;
};

const AddPublicFeedbackForm = ({ closeDialog }: AddPublicFeedbackFormProps) => {
  const { slug } = useParams() as {
    slug: string;
  };

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof publicFeedbackSchema>>({
    resolver: zodResolver(publicFeedbackSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const createFeedbackMutation = useMutation({
    mutationFn: addPublicFeedback,
    onSuccess: () => {
      closeDialog();
      toast.success('Your feedback has been submitted');
      queryClient.invalidateQueries({ queryKey: ['board', 'open', slug] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: z.infer<typeof publicFeedbackSchema>) => {
    createFeedbackMutation.mutate({
      slug,
      title: data.title,
      description: data.description,
      name: data.name,
      email: data.email,
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
                  <TextEditor
                    placeholder="Explain in detail..."
                    className={
                      '[&>.tiptap]:bg-gray-50 [&>.tiptap]:rounded-sm [&>.tiptap]:min-h-20 [&>.tiptap]:px-3 [&>.tiptap]:py-2 [&>.tiptap]:text-sm break-all'
                    }
                    {...field}
                    form={form}
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="sm:justify-end gap-2 flex-col">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={createFeedbackMutation.isPending}>
            {createFeedbackMutation.isPending && (
              <Loader className="w-4 h-4 mr-1.5 animate-spin" />
            )}
            Submit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddPublicFeedbackForm;
