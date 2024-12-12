'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { TextEditor } from '@/components/text-editor';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { addFeedback } from '@/data-access/feedback';
import { cn } from '@/lib/utils';
import { feedbackSchema } from '@/validations/feedback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Check,
  ChevronsUpDown,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  CircleMinus,
  Loader,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

type FeedbackDialogFormProps = {
  closeDialog: () => void;
};

enum FeedbackStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

type Status = {
  value: FeedbackStatus;
  label: string;
  icon: React.JSX.Element;
};

const statuses: Status[] = [
  {
    value: FeedbackStatus.PENDING,
    label: 'Pending',
    icon: <CircleDashed className="size-4 text-gray-400" />,
  },
  {
    value: FeedbackStatus.APPROVED,
    label: 'Approved',
    icon: <CircleDotDashed className="size-4 text-emerald-400" />,
  },
  {
    value: FeedbackStatus.IN_PROGRESS,
    label: 'In Progress',
    icon: <CircleDot className="size-4 text-violet-400" />,
  },
  {
    value: FeedbackStatus.DONE,
    label: 'Done',
    icon: <CircleCheck className="size-4 text-blue-400" />,
  },
  {
    value: FeedbackStatus.CANCELLED,
    label: 'Canceled',
    icon: <CircleMinus className="size-4 text-red-400" />,
  },
];

export const AddDashboardFeedbackForm = ({
  closeDialog,
}: FeedbackDialogFormProps) => {
  const [open, setOpen] = useState(false);
  const { slug } = useParams() as {
    slug: string;
  };
  const [selectedStatus, setSelectedStatus] = useState<Status>();

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'APPROVED',
    },
  });

  const createFeedbackMutation = useMutation({
    mutationFn: addFeedback,
    onSuccess: () => {
      closeDialog();
      toast.success('Your feedback has been submitted');
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: z.infer<typeof feedbackSchema>) => {
    createFeedbackMutation.mutate({
      slug,
      title: data.title,
      description: data.description,
    });
  };

  useEffect(() => {
    setSelectedStatus(
      statuses.find((status) => status.value === form.getValues('status'))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('status')]);

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
                      '[&>.tiptap]:bg-transparent [&>.tiptap]:border [&>.tiptap]:border-input [&>.tiptap]:rounded-sm [&>.tiptap]:min-h-20 [&>.tiptap]:px-3 [&>.tiptap]:py-2 [&>.tiptap]:text-sm'
                    }
                    form={form}
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
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <div className="w-full flex flex-col space-y-1">
                <FormLabel>Status</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="justify-between rounded-md font-normal"
                      >
                        {field.value ? (
                          <div className="flex items-center mr-2">
                            {selectedStatus?.icon}
                            <span className="ml-2">
                              {selectedStatus?.label}
                            </span>
                          </div>
                        ) : (
                          'Select status'
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                    <Command>
                      <CommandInput placeholder="Search status..." />
                      <CommandList>
                        <CommandEmpty>No status found.</CommandEmpty>
                        <CommandGroup>
                          {statuses.map((status) => (
                            <CommandItem
                              value={status.label}
                              key={status.value}
                              onSelect={() => {
                                form.setValue('status', status.value);
                                setOpen(false);
                              }}
                            >
                              {status.icon}
                              <span>{status.label}</span>
                              <Check
                                className={cn(
                                  'ml-auto',
                                  status.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <FormDescription>Set a initial status</FormDescription>
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
