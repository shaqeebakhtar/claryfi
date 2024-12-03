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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const BoardName = () => {
  const [currBoardName, setCurrBoardName] = useState('');
  const { slug } = useParams() as { slug: string };

  const nameSchema = boardSchema.pick({ name: true });

  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: currBoardName,
    },
  });

  const queryClient = useQueryClient();

  const { data: boardName, isPending: boardNamePending } = useQuery({
    queryKey: ['board-details', slug],
    queryFn: () => getBoardDetailsBySlugProtected({ slug }),
  });

  const updateBoardNameMutation = useMutation({
    mutationFn: updateBoardDetails,
    onSuccess: (data) => {
      toast.success('Updated board successfully');
      setCurrBoardName(data.name);
      queryClient.invalidateQueries({ queryKey: ['board-details', slug] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof nameSchema>) => {
    updateBoardNameMutation.mutate({ name: values.name, currSlug: slug });
  };

  useEffect(() => {
    if (!boardNamePending) {
      setCurrBoardName(boardName?.name);
      form.setValue('name', boardName?.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardName?.name]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="xl:space-x-3 pt-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid xl:grid-cols-4 space-y-0 gap-6 xl:gap-3 items-start">
              <div className="space-y-1">
                <FormLabel className="text-base font-medium">
                  Board Name
                </FormLabel>
                <FormDescription>
                  This is the name of your board.
                </FormDescription>
                <FormMessage />
              </div>
              <div className="col-span-2 flex flex-col gap-3 items-end">
                <FormControl>
                  <Input placeholder="My board" {...field} />
                </FormControl>
                <Button
                  type="submit"
                  className={cn(
                    form.watch('name').trim() === currBoardName &&
                      'bg-gray-200 shadow-none border border-gray-300 text-gray-900 cursor-not-allowed'
                  )}
                  disabled={form.watch('name').trim() === currBoardName}
                >
                  {updateBoardNameMutation.isPending && (
                    <Loader className="w-4 h-4 mr-1.5 animate-spin" />
                  )}
                  Save changes
                </Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default BoardName;
