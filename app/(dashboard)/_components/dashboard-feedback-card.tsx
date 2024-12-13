'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { undovoteFeedback, upvoteFeedback } from '@/data-access/feedback';
import { cn } from '@/lib/utils';
// import { Feedback, Upvote } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ChevronUp,
  MessageCircle,
  MoreHorizontal,
  PencilLine,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import FeedbackDropdownMenu from '../../(board)/_components/feedback-dropdown-menu';
// import FeedbackStatus from '../../(board)/_components/feedback-status';
import { useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { IFeedback } from '@/types/feedback';
import DeleteFeedback from './delete-feedback';

enum FeedbackStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

type Feedback = {
  title: string;
  description: string;
  status: FeedbackStatus;
  upvotes: number;
  comments: number;
};

type FeedbackCardProps = {
  feedback: IFeedback;
};

export const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  const { slug } = useParams() as { slug: string };
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const tagColors = [
    {
      name: 'Gray',
      tagClass: 'bg-gray-100 text-gray-600',
      buttonClass: 'bg-gray-500',
    },
    {
      name: 'Red',
      tagClass: 'bg-red-100 text-red-600',
      buttonClass: 'bg-red-500',
    },
    {
      name: 'Orange',
      tagClass: 'bg-orange-100 text-orange-600',
      buttonClass: 'bg-orange-500',
    },
    {
      name: 'Cyan',
      tagClass: 'bg-cyan-100 text-cyan-600',
      buttonClass: 'bg-cyan-500',
    },
    {
      name: 'Green',
      tagClass: 'bg-green-100 text-green-600',
      buttonClass: 'bg-green-500',
    },
    {
      name: 'Blue',
      tagClass: 'bg-blue-100 text-blue-600',
      buttonClass: 'bg-blue-500',
    },
    {
      name: 'Yellow',
      tagClass: 'bg-yellow-100 text-yellow-600',
      buttonClass: 'bg-yellow-500',
    },
    {
      name: 'Purple',
      tagClass: 'bg-purple-100 text-purple-600',
      buttonClass: 'bg-purple-500',
    },
  ];

  // const [canEdit, setCanEdit] = useState<boolean>(false);
  // const [upvotes, setUpvotes] = useState<number>(feedback._count.upvotes);
  // const [status, setStatus] = useState<string>(feedback.status);

  // const { data: session } = useSession();

  // const queryClient = useQueryClient();

  // const upvoteFeedbackMutation = useMutation({
  //   mutationFn: upvoteFeedback,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['feedbacks', slug] });
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //     setUpvoted(!upvoted);
  //     setUpvotes((prev) => prev - 1);
  //   },
  // });

  // const undovoteFeedbackMutation = useMutation({
  //   mutationFn: undovoteFeedback,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['feedbacks', slug] });
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  // useEffect(() => {
  //   const hasUpvoted = feedback.upvotes.some(
  //     (upvote) => upvote.upvoterId === session?.user?.id
  //   );
  //   setUpvoted(hasUpvoted);
  // }, [feedback.upvotes, session?.user?.id]);

  // useEffect(() => {
  //   setCanEdit(path === `/b/${slug}/admin`);
  // }, [path, slug]);

  // const handleUpvoteAndUndovote = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setUpvoted(!upvoted);
  //   if (upvoted) {
  //     undovoteFeedbackMutation.mutate({
  //       slug,
  //       feedbackId: feedback.id,
  //     });
  //     setUpvotes((prev) => prev - 1);
  //   } else {
  //     upvoteFeedbackMutation.mutate({
  //       slug,
  //       feedbackId: feedback.id,
  //     });
  //     setUpvotes((prev) => prev + 1);
  //   }
  // };

  return (
    <div className="mt-2 p-4 sm:p-5 bg-background rounded-md flex flex-col gap-4 relative border">
      <div className="space-y-3">
        {feedback.tags.length > 0 && (
          <div className="flex items-center gap-1.5">
            {feedback.tags.map((tag) => (
              <div
                key={tag.tag.name}
                className={cn(
                  'text-xs font-medium px-2 py-0.5 rounded-sm',
                  tagColors.find(
                    (color) =>
                      color.name.toLowerCase() === tag.tag.color.toLowerCase()
                  )?.tagClass
                )}
              >
                {tag.tag.name}
              </div>
            ))}
          </div>
        )}
        <div
          className="space-y-0.5 group"
          onClick={() =>
            router.push(`${pathname}?f=${feedback.id}`, { scroll: false })
          }
        >
          <h3 className="font-medium group-hover:text-primary transition-all">
            {feedback.title}
          </h3>
          <p
            className="text-muted-foreground text-sm line-clamp-3"
            dangerouslySetInnerHTML={{ __html: feedback.description }}
          ></p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            className={cn(
              'flex gap-1.5 items-center text-xs font-bold rounded-lg py-1.5 px-3 bg-primary/10 hover:bg-primary/20 transition-all',
              upvoted && 'bg-primary text-white hover:bg-primary/80'
            )}
          >
            <ChevronUp
              className={cn('size-4 text-primary', upvoted && 'text-white')}
              strokeWidth={3}
            />
            <span>{feedback._count.upvotes}</span>
          </button>
          <div className="flex items-center gap-1">
            <MessageCircle className="size-4 text-muted-foreground" />
            <span className="font-semibold text-xs">
              {feedback._count.comments}
            </span>
          </div>
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="font-medium">
              <PencilLine className="size-4 mr-2 text-muted-foreground" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="font-medium text-destructive focus:text-destructive focus:bg-destructive/10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDeleteDialogOpen(true);
              }}
            >
              <Trash2 className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DeleteFeedback
        feedbackId={feedback.id}
        isDialogOpen={isDeleteDialogOpen}
        setIsDialogOpen={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
};

export const FeedbackCardSkeleton = () => {
  return (
    <div className="mt-2 p-4 sm:p-5 bg-background rounded-md flex flex-col gap-4 relative border">
      <div className="space-y-3">
        <div className="flex items-center gap-1.5">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-20 h-6" />
        </div>
        <div className="space-y-0.5">
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-64 h-4" />
          <Skeleton className="w-56 h-4" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Skeleton className="w-14 h-7 rounded-lg" />
          <Skeleton className="size-7 rounded-lg" />
        </div>
        <Skeleton className="size-9 rounded-lg" />
      </div>
    </div>
  );
};
