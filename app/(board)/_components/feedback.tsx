'use client';
import { ChevronUp, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type FeedbackCardProps = {};

const FeedbackCard = (props: FeedbackCardProps) => {
  const [upvoted, setUpvoted] = useState<boolean>(false);

  return (
    <li className="group relative">
      <Link
        href="/hello"
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
          <span>99</span>
        </button>
        <div className="space-y-3 md:space-y-1">
          <div className="flex flex-col-reverse md:flex-row items-start md:items-center gap-2.5">
            <h3 className="font-semibold text-base md:text-lg group-hover:text-primary transition-all">
              Feedback title goes here
            </h3>
            <div className="bg-destructive/10 text-xs font-medium text-destructive w-max px-2.5 py-0.5 rounded-full">
              <span>Cancelled</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            Feedback description text goes here Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Dignissimos doloremque corrupti
            aspernatur. Aliquid, nostrum fuga. Lorem ipsum dolor sit amet. Lorem
            ipsum dolor sit amet.
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
            <span>99</span>
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
