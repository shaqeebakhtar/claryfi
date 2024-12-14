'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { checkSlugExists, createBoard } from '@/services/admin/board';
import { boardSchema } from '@/validations/board';
import { zodResolver } from '@hookform/resolvers/zod';
import slugify from '@sindresorhus/slugify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { CircleCheck, CircleX, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const Page = () => {
  const [slugExists, setSlugExists] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  const debouncedSlug = useDebounce(form.watch('slug'), 500);

  const checkSlugExistsMutation = useMutation({
    mutationFn: checkSlugExists,
    onSuccess: (data) => {
      if (data.available) {
        setSlugExists(true);
        form.clearErrors('slug');
      } else {
        setSlugExists(false);
        form.setError('slug', { message: 'Slug is already taken' });
      }
    },
  });

  const createBoardMutation = useMutation({
    mutationFn: createBoard,
    onSuccess: (data) => {
      toast.success('Your board has been created');
      router.push(`/${data.slug}`);
    },
    onError: () => {
      toast.error('Unable to create board');
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
    <div className="grid place-items-center h-screen mx-auto">
      <div className="h-full flex flex-col p-6 lg:p-8 2xl:px-24">
        <main className="h-full flex items-center justify-between">
          <div className="max-w-[450px] mx-auto flex flex-col items-center">
            <div className="w-full space-y-6">
              <div className="space-y-1.5 text-center">
                <h3 className="text-2xl font-semibold font-title">
                  Let&apos;s get you started
                </h3>
                <p className="text-sm text-muted-foreground">
                  Start collecting valuable insights from your users by creating
                  a feedback board.
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-4"
                >
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
                                form.setValue(
                                  'slug',
                                  slugify(e.currentTarget.value)
                                );
                              }}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
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
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-1">
                          <FormLabel>
                            Website URL
                            <span className="text-muted-foreground text-xs ml-1.5">
                              (Optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://acme.com" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full"
                    disabled={
                      !slugExists ||
                      form.watch('name') === '' ||
                      form.watch('slug') === '' ||
                      createBoardMutation.isPending
                    }
                  >
                    {createBoardMutation.isPending && (
                      <Loader className="w-4 h-4 mr-1.5 animate-spin" />
                    )}
                    Create
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
