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
import { useParams, usePathname } from 'next/navigation';
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
  feedback: Feedback;
};

export const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  const { slug } = useParams() as { slug: string };
  const path = usePathname();
  const [upvoted, setUpvoted] = useState<boolean>(false);
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
        <div className="flex items-center gap-1.5">
          <div className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-600 rounded-sm">
            Feature
          </div>
          <div className="text-xs font-medium px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-sm">
            UI/UX
          </div>
        </div>
        <div className="space-y-0.5">
          <h3 className="font-medium">{feedback.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {feedback.description}
          </p>
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
            <span>{feedback.upvotes}</span>
          </button>
          <div className="flex items-center gap-1">
            <MessageCircle className="size-4 text-muted-foreground" />
            <span className="font-semibold text-xs">{feedback.comments}</span>
          </div>
        </div>
        <DropdownMenu>
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
            <DropdownMenuItem className="font-medium text-destructive focus:text-destructive focus:bg-destructive/10">
              <Trash2 className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export const FeedbackCardSkeleton = () => {
  return (
    <li className="relative list-none">
      <div className="p-8 bg-background rounded-xl shadow transition-all flex flex-col md:flex-row md:items-start justify-between gap-5 md:gap-8 relative">
        <Skeleton className="w-12 h-16 rounded-lg hidden md:block" />
        <div className="space-y-3 md:space-y-1 w-full">
          <div className="flex flex-col-reverse md:flex-row items-start md:items-center gap-2.5">
            <Skeleton className="w-56 h-6" />
            <Skeleton className="w-20 h-5 rounded-full" />
          </div>
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-1/2 h-4" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="w-16 h-8 rounded-lg md:hidden" />
          <Skeleton className="w-12 h-8 rounded-lg" />
        </div>
      </div>
    </li>
  );
};
