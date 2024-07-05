'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  getBoardDetailsBySlugProtected,
  updateBoardDetails,
} from '@/data-access/board';
import { cn } from '@/lib/utils';
import { boardSchema } from '@/validations/board';
import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const BoardSlug = () => {
  const [currBoardSlug, setCurrBoardSlug] = useState('');
  const { slug } = useParams() as { slug: string };

  const router = useRouter();

  const slugSchema = boardSchema.pick({ slug: true });

  const form = useForm<z.infer<typeof slugSchema>>({
    resolver: zodResolver(slugSchema),
    defaultValues: {
      slug: currBoardSlug,
    },
  });

  const queryClient = new QueryClient();

  const { data: boardSlug, isPending: boardSlugPending } = useQuery({
    queryKey: ['board-details', slug],
    queryFn: () => getBoardDetailsBySlugProtected({ slug }),
  });

  const updateBoardSlugMutation = useMutation({
    mutationFn: updateBoardDetails,
    onSuccess: (data) => {
      toast.success('Updated board successfully');
      queryClient.invalidateQueries({ queryKey: ['board-details', slug] });
      router.push(`/b/${data?.slug}/admin/settings`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof slugSchema>) => {
    updateBoardSlugMutation.mutate({ newSlug: values.slug, currSlug: slug });
  };

  useEffect(() => {
    if (!boardSlugPending) {
      setCurrBoardSlug(boardSlug?.slug);
      form.setValue('slug', boardSlug?.slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardSlug?.slug]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-lg border border-gray-200 bg-background"
        >
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="space-y-6 p-5 sm:p-10">
                <div className="space-y-2">
                  <FormLabel className="text-xl font-medium">
                    Board Slug
                  </FormLabel>
                  <FormDescription>
                    This is the unique slug of your board on Claryfi to access
                    your board.
                  </FormDescription>
                </div>
                <FormControl>
                  <Input placeholder="my-board" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between space-x-4 rounded-b-lg border-t border-gray-200 bg-gray-50 p-3 sm:px-10">
            <p className="text-sm text-muted-foreground">
              Only lowercase letters, numbers, and dashes. Max 48 characters.
            </p>
            <div className="shrink-0">
              <Button
                type="submit"
                className={cn(
                  form.watch('slug').trim() === currBoardSlug &&
                    'bg-gray-200 shadow-none border border-gray-300 text-gray-900 cursor-not-allowed'
                )}
                disabled={form.watch('slug').trim() === currBoardSlug}
              >
                {updateBoardSlugMutation.isPending && (
                  <Loader className="w-4 h-4 mr-1.5 animate-spin" />
                )}
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default BoardSlug;
