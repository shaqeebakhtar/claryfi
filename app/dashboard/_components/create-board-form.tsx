'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { boardSchema } from '@/validations/board';
import slugify from '@sindresorhus/slugify';

const CreateBoardForm = () => {
  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  const onSubmit = (data: z.infer<typeof boardSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-1">
                <FormLabel>Board Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Acme Inc"
                    {...field}
                    onChange={(e) => {
                      form.setValue('name', e.currentTarget.value);
                      form.setValue('slug', slugify(e.currentTarget.value));
                    }}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-1">
                <FormLabel>Board Slug</FormLabel>
                <div className="flex items-center">
                  <div className="inline-flex items-center h-9 bg-muted text-muted-foreground px-3 text-sm font-medium rounded-md rounded-r-none border border-input border-r-0 select-none">
                    claryfi.to/b/
                  </div>
                  <Input
                    placeholder="acme"
                    className="rounded-l-none"
                    {...field}
                  />
                </div>
              </div>
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
          <Button>Create</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateBoardForm;
