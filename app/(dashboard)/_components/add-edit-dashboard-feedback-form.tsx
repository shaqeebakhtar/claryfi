'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MultiSelect } from '@/components/multi-select';
import { ModalClose, ModalFooter } from '@/components/responsive-dialog';
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
import {
  Form,
  FormControl,
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
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { getTagsByBoardSlug } from '@/services/admin/tag';
import { feedbackSchema } from '@/validations/feedback';
import { Tag as TTag } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  addFeedback,
  getFeedbackById,
  updateFeedback,
} from '@/services/admin/feedback';
import { FeedbackStatus } from '@/types/feedback';

type FeedbackDialogFormProps = {
  feedbackId?: string;
  closeDialog: () => void;
};

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
  feedbackId,
}: FeedbackDialogFormProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { slug } = useParams() as {
    slug: string;
  };
  const [selectedStatus, setSelectedStatus] = useState<Status>();
  const [selectedTags, setSelectedTags] = useState<TTag[]>([]);
  const isMobile = useIsMobile();

  const { data: tags, isLoading: isLoadingTags } = useQuery({
    queryFn: () => getTagsByBoardSlug(slug),
    queryKey: [slug, 'tags'],
  });
  const { data: feedback, isLoading: isLoadingFeedback } = useQuery({
    queryFn: () => getFeedbackById({ slug, feedbackId: feedbackId as string }),
    queryKey: [slug, 'feedback', feedbackId],
    enabled: !!feedbackId,
  });

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'APPROVED',
    },
  });

  const { mutate: add, isPending: isAddPending } = useMutation({
    mutationFn: addFeedback,
    onSuccess: () => {
      closeDialog();
      toast.success('Your feedback has been submitted');
      queryClient.invalidateQueries({ queryKey: [slug, 'feedbacks'] });
    },
    onError: () => {
      toast.error('Failed to add feedback');
    },
  });

  const { mutate: update, isPending: isUpdatePending } = useMutation({
    mutationFn: updateFeedback,
    onSuccess: () => {
      closeDialog();
      toast.success('Feedback updated successfully');
      queryClient.invalidateQueries({ queryKey: [slug, 'feedbacks'] });
    },
    onError: () => {
      toast.error('Failed to update feedback');
    },
  });

  const onSubmit = (data: z.infer<typeof feedbackSchema>) => {
    feedbackId
      ? update({
          slug,
          feedbackId,
          title: data.title,
          description: data.description,
          status: data.status,
          tagIds: selectedTags.map((tag) => tag.id),
        })
      : add({
          slug,
          title: data.title,
          description: data.description,
          status: data.status,
          tagIds: selectedTags.map((tag) => tag.id),
        });
  };

  useEffect(() => {
    if (!isLoadingFeedback && feedback) {
      form.setValue('title', feedback.title);
      form.setValue('description', feedback.description);
      form.setValue('status', feedback.status);
    }

    if (!isLoadingFeedback && !isLoadingTags && feedback && tags) {
      const matchedTags = feedback?.tags
        .map((tag) => tags?.find((t) => t.id === tag.tagId))
        .filter(Boolean);
      setSelectedTags(matchedTags as TTag[]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbackId, feedback, tags, isLoadingTags, isLoadingFeedback]);

  useEffect(() => {
    setSelectedStatus(
      statuses.find((status) => status.value === form.getValues('status'))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('status')]);

  return (
    <Form {...form}>
      <form
        className="p-4 lg:p-0 space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
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
                      value={field.value}
                    />
                  </FormControl>
                </div>
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
                          className="justify-between rounded-md font-normal hover:bg-transparent shadow-none"
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
                                    'ml-auto size-4',
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
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex flex-col">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Tags
                <span className="ml-1.5 text-xs text-muted-foreground">
                  (Optional)
                </span>
              </label>
              <Link
                href={`${slug}/settings#manage-tags`}
                className="text-xs underline text-muted-foreground hover:text-foreground"
              >
                Manage
              </Link>
            </div>
            <MultiSelect
              options={tags}
              onValueChange={setSelectedTags}
              defaultValues={selectedTags}
              placeholder="Select tags..."
              maxCount={isMobile ? 1 : 3}
            />
          </div>
        </div>
        <ModalFooter className="sm:justify-end gap-2">
          <ModalClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </ModalClose>
          <Button disabled={isAddPending || isUpdatePending}>
            {(isAddPending || isUpdatePending) && (
              <Loader className="w-4 h-4 mr-1.5 animate-spin" />
            )}
            {feedbackId ? 'Update' : 'Submit'}
          </Button>
        </ModalFooter>
      </form>
    </Form>
  );
};
