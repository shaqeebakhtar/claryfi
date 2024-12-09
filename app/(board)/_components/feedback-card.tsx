'use client';
import { cn } from '@/lib/utils';
import { ChevronUp, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import FeedbackCardStatus from './feedback-card-status';
import { usePathname, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Comment, Feedback, Upvote } from '@prisma/client';

enum FeedbackStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

interface IFeedback extends Feedback {
  _count: {
    upvotes: number;
    comments: number;
  };
}

const FeedbackCard = ({ feedback }: { feedback: IFeedback }) => {
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="group p-4 sm:p-5 bg-background rounded-md flex gap-6 relative cursor-pointer hover:shadow-sm"
      onClick={() =>
        router.push(`${pathname}?f=${feedback.title}`, { scroll: false })
      }
    >
      <div className="flex flex-col items-center justify-between">
        <button
          className={cn(
            'flex flex-col gap-1 items-center text-xs font-bold rounded-lg py-2 px-2.5 bg-primary/10 hover:bg-primary/20 transition-all',
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
      <div className="flex flex-col gap-3">
        <FeedbackCardStatus status={feedback.status} />
        <div className="space-y-1 mb-2">
          <h3 className="font-medium">{feedback.title}</h3>
          <div
            className="feedback--desc text-muted-foreground text-sm line-clamp-2"
            dangerouslySetInnerHTML={{ __html: feedback.description }}
          ></div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-600 rounded-sm">
            Feature
          </div>
          <div className="text-xs font-medium px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-sm">
            UI/UX
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;

export const FeedbackCardSkeleton = () => {
  return (
    <div className="p-4 sm:p-5 bg-background rounded-md flex gap-6 relative cursor-pointer">
      <div className="flex flex-col items-center justify-between">
        <Skeleton className="w-full h-14 rounded-lg" />
        <Skeleton className="w-8 h-6 rounded-lg" />
      </div>
      <div className="space-y-3">
        <Skeleton className="w-12 h-4" />
        <div className="space-y-0.5">
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-64 h-4" />
          <Skeleton className="w-56 h-4" />
        </div>
        <div className="flex items-center gap-1.5">
          <Skeleton className="max-w-48 h-6" />
          <Skeleton className="max-w-48 h-6" />
        </div>
      </div>
    </div>
  );
};
