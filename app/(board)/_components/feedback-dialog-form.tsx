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

const FormSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }),
  detail: z.string().min(5, {
    message: 'Details must be at least 5 characters.',
  }),
});

const FeedbackDialogForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      detail: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {};

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
          name="detail"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-1">
                <FormLabel>Feedback Detail</FormLabel>
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
          <Button>Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default FeedbackDialogForm;
