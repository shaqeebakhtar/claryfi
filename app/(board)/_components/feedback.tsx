'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { undovoteFeedback, upvoteFeedback } from '@/data-access/feedback';
import { cn } from '@/lib/utils';
import { Feedback, Upvote } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronUp, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import FeedbackDropdownMenu from './feedback-dropdown-menu';
import FeedbackStatus from './feedback-status';
import { useSession } from 'next-auth/react';

type FeedbackCardProps = {
  feedback: Feedback & {
    upvotes: Upvote[];
    _count: {
      upvotes: number;
      comments: number;
    };
  };
};

const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  const { slug } = useParams() as { slug: string };
  const path = usePathname();
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [upvotes, setUpvotes] = useState<number>(feedback._count.upvotes);
  const [status, setStatus] = useState<string>(feedback.status);

  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const upvoteFeedbackMutation = useMutation({
    mutationFn: upvoteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks', slug] });
    },
    onError: (error) => {
      toast.error(error.message);
      setUpvoted(!upvoted);
      setUpvotes((prev) => prev - 1);
    },
  });

  const undovoteFeedbackMutation = useMutation({
    mutationFn: undovoteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks', slug] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    const hasUpvoted = feedback.upvotes.some(
      (upvote) => upvote.upvoterId === session?.user?.id
    );
    setUpvoted(hasUpvoted);
  }, [feedback.upvotes, session?.user?.id]);

  useEffect(() => {
    setCanEdit(path === `/b/${slug}/admin`);
  }, [path, slug]);

  const handleUpvoteAndUndovote = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setUpvoted(!upvoted);
    if (upvoted) {
      undovoteFeedbackMutation.mutate({
        slug,
        feedbackId: feedback.id,
      });
      setUpvotes((prev) => prev - 1);
    } else {
      upvoteFeedbackMutation.mutate({
        slug,
        feedbackId: feedback.id,
      });
      setUpvotes((prev) => prev + 1);
    }
  };

  return (
    <li className="group relative list-none">
      <Link
        href={`/b/${slug}/f/${feedback.id}`}
        className="p-6 sm:p-8 bg-background rounded-xl shadow transition-all hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-8 relative"
      >
        <button
          className={cn(
            'w-10 gap-1 items-center flex-col text-sm font-bold rounded-lg p-3 self-start bg-primary/10 hover:bg-primary/30 transition-all hidden md:flex',
            upvoted && 'bg-primary text-white hover:bg-primary/80'
          )}
          onClick={(e) => handleUpvoteAndUndovote(e)}
        >
          <ChevronUp
            className={cn('w-4 h-4 text-primary', upvoted && 'text-white')}
            strokeWidth={3}
          />
          <span>{upvotes}</span>
        </button>
        <div className="space-y-3 md:space-y-1 w-full">
          <div className="flex flex-col-reverse md:flex-row items-start md:items-center gap-2.5">
            <h3 className="font-semibold text-base md:text-lg group-hover:text-primary transition-all">
              {feedback.title}
            </h3>
            <FeedbackStatus status={status} />
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            {feedback.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className={cn(
              'gap-2 items-center text-sm font-bold rounded-lg py-1.5 px-3 bg-primary/10 hover:bg-primary/30 transition-all flex md:hidden',
              upvoted && 'bg-primary text-white hover:bg-primary/80'
            )}
            onClick={(e) => handleUpvoteAndUndovote(e)}
          >
            <ChevronUp
              className={cn('w-4 h-4 text-primary', upvoted && 'text-white')}
              strokeWidth={3}
            />
            <span>{upvotes}</span>
          </button>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <MessageCircle className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold text-sm md:text-base">
                {feedback._count.comments ?? '0'}
              </span>
            </div>
            {canEdit && (
              <FeedbackDropdownMenu
                feedbackId={feedback.id}
                status={status}
                changeStatus={(value: string) => setStatus(value)}
              />
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default FeedbackCard;

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
