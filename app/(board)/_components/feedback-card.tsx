'use client';
import { cn } from '@/lib/utils';
import { ChevronUp, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import FeedbackCardStatus from './feedback-card-status';
import { usePathname, useRouter } from 'next/navigation';

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

const FeedbackCard = ({ feedback }: { feedback: Feedback }) => {
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="p-4 sm:p-5 bg-background rounded-md flex items-start gap-5 relative cursor-pointer"
      onClick={() =>
        router.push(`${pathname}?f=${feedback.title}`, { scroll: false })
      }
    >
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
        <span>{feedback.upvotes}</span>
      </button>
      <div className="space-y-3">
        <FeedbackCardStatus status={feedback.status} />
        <div className="space-y-0.5">
          <h3 className="font-medium">{feedback.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {feedback.description}
          </p>
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
