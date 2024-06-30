'use client';
import { ChevronUp, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Feedback } from '@prisma/client';
import { useParams } from 'next/navigation';
import FeedbackStatus from './feedback-status';

type FeedbackCardProps = {
  feedback: Feedback;
};

const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  const { slug } = useParams() as { slug: string };
  const [upvoted, setUpvoted] = useState<boolean>(false);

  return (
    <li className="group relative">
      <Link
        href={`/b/${slug}/f/${feedback.id}`}
        className="p-8 bg-background rounded-xl shadow transition-all hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-8 relative"
      >
        <button
          className={cn(
            'w-10 gap-1 items-center flex-col text-sm font-bold rounded-lg p-3 self-start bg-primary/10 hover:bg-primary/30 transition-all hidden md:flex',
            upvoted && 'bg-primary text-white hover:bg-primary/80'
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setUpvoted(!upvoted);
          }}
        >
          <ChevronUp
            className={cn('w-4 h-4 text-primary', upvoted && 'text-white')}
            strokeWidth={3}
          />
          <span>{feedback.upvotes}</span>
        </button>
        <div className="space-y-3 md:space-y-1 w-full">
          <div className="flex flex-col-reverse md:flex-row items-start md:items-center gap-2.5">
            <h3 className="font-semibold text-base md:text-lg group-hover:text-primary transition-all">
              {feedback.title}
            </h3>
            <FeedbackStatus status={feedback.status} />
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setUpvoted(!upvoted);
            }}
          >
            <ChevronUp
              className={cn('w-4 h-4 text-primary', upvoted && 'text-white')}
              strokeWidth={3}
            />
            <span>{feedback.upvotes}</span>
          </button>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-5 h-5 text-muted-foreground" />
            <span className="font-semibold text-sm md:text-base">12</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default FeedbackCard;

export const FeedbackCardSkeleton = () => {
  return (
    <li className="group relative">
      <div className="p-8 bg-background rounded-xl shadow transition-all hover:shadow-md flex flex-col md:flex-row md:items-start justify-between gap-5 md:gap-8 relative">
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
