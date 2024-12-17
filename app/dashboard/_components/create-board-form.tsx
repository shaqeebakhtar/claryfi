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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { CircleCheck, CircleX, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { checkSlugExists, createBoard } from '@/services/admin/board';

type CreateBoardFormProps = {
  closeDialog: () => void;
};

const CreateBoardForm = ({ closeDialog }: CreateBoardFormProps) => {
  const [slugExists, setSlugExists] = useState(false);

  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  const queryClient = useQueryClient();

  const debouncedSlug = useDebounce(form.watch('slug'), 500);

  const checkSlugExistsMutation = useMutation({
    mutationFn: checkSlugExists,
    onSuccess: (data) => {
      if (data.available) {
        setSlugExists(true);
        form.clearErrors('slug');
      } else {
        setSlugExists(false);
        form.setError('slug', { message: 'Slug already taken' });
      }
    },
  });

  const createBoardMutation = useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      closeDialog();
      toast.success('Your board has been created');
      queryClient.invalidateQueries({ queryKey: ['boards'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: z.infer<typeof boardSchema>) => {
    if (slugExists) {
      createBoardMutation.mutate(data);
    }
  };

  useEffect(() => {
    if (debouncedSlug.length > 1) {
      checkSlugExistsMutation.mutate({ slug: form.getValues('slug') });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSlug]);

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
                <div className="flex items-center relative">
                  <div className="inline-flex items-center h-9 bg-muted text-muted-foreground px-3 text-sm font-medium rounded-md rounded-r-none border border-input border-r-0 select-none">
                    claryfi.to/b/
                  </div>
                  <Input
                    placeholder="acme"
                    className="rounded-l-none"
                    {...field}
                    onChange={(e) => {
                      form.setValue('slug', e.currentTarget.value);
                    }}
                  />
                  <div className="absolute right-3">
                    {checkSlugExistsMutation.isPending &&
                      debouncedSlug.length > 1 && (
                        <Loader className="w-4 h-4 animate-spin" />
                      )}
                    {!checkSlugExistsMutation.isPending &&
                      slugExists &&
                      debouncedSlug.length > 1 && (
                        <CircleCheck className="w-4 h-4 text-green-600" />
                      )}
                    {!checkSlugExistsMutation.isPending &&
                      !slugExists &&
                      debouncedSlug.length > 1 && (
                        <CircleX className="w-4 h-4 text-destructive" />
                      )}
                  </div>
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
          <Button disabled={!slugExists || createBoardMutation.isPending}>
            {createBoardMutation.isPending && (
              <Loader className="w-4 h-4 mr-1.5 animate-spin" />
            )}
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateBoardForm;
