'use client';
import React, { useState } from 'react';
import {
  ChevronUp,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  CircleMinus,
  MessageCircle,
} from 'lucide-react';
import { cn, snakeCaseToString } from '@/lib/utils';
import { FeedbackCard } from '@/app/(dashboard)/_components/dashboard-feedback-card';
import AddPublicFeedback from '@/app/(board)/_components/add-public-feedback';

enum FeedbackStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

const columns = [
  FeedbackStatus.APPROVED,
  FeedbackStatus.IN_PROGRESS,
  FeedbackStatus.DONE,
];

type Feedback = {
  title: string;
  description: string;
  status: FeedbackStatus;
  upvotes: number;
  comments: number;
};

type FeedbackState = {
  [key in FeedbackStatus]: Feedback[];
};

const feedbacks: Feedback[] = [
  {
    title: 'Add dark mode feature',
    description:
      'It would be great to have a dark mode option for better usability at night.',
    status: FeedbackStatus.PENDING,
    upvotes: 45,
    comments: 12,
  },
  {
    title: 'Fix login issue on mobile',
    description:
      'Users are unable to log in using the mobile app when on slower networks.',
    status: FeedbackStatus.APPROVED,
    upvotes: 30,
    comments: 8,
  },
  {
    title: 'Integrate payment gateway',
    description:
      'Add support for a popular payment gateway like PayPal or Stripe.',
    status: FeedbackStatus.IN_PROGRESS,
    upvotes: 60,
    comments: 15,
  },
  {
    title: 'Improve page loading speed',
    description:
      'Optimize the website to load faster, especially on older devices.',
    status: FeedbackStatus.DONE,
    upvotes: 100,
    comments: 25,
  },
  {
    title: 'Add multilingual support',
    description:
      'Enable users to switch between multiple languages on the platform.',
    status: FeedbackStatus.CANCELLED,
    upvotes: 20,
    comments: 5,
  },
  {
    title: 'Create a user onboarding tutorial',
    description:
      'A simple walkthrough to help new users understand the platform quickly.',
    status: FeedbackStatus.PENDING,
    upvotes: 35,
    comments: 9,
  },
  {
    title: 'Enhance accessibility features',
    description: 'Add screen reader support and better keyboard navigation.',
    status: FeedbackStatus.APPROVED,
    upvotes: 50,
    comments: 10,
  },
  {
    title: 'Implement two-factor authentication',
    description: 'Improve account security by adding 2FA via SMS or email.',
    status: FeedbackStatus.IN_PROGRESS,
    upvotes: 75,
    comments: 20,
  },
  {
    title: 'Redesign the dashboard layout',
    description: 'Make the dashboard more intuitive and visually appealing.',
    status: FeedbackStatus.DONE,
    upvotes: 95,
    comments: 30,
  },
  {
    title: 'Add support for file attachments in comments',
    description:
      'Allow users to upload files and images within their comments.',
    status: FeedbackStatus.PENDING,
    upvotes: 25,
    comments: 6,
  },
  {
    title: 'Provide an offline mode',
    description:
      'Enable basic functionalities to work without an internet connection.',
    status: FeedbackStatus.CANCELLED,
    upvotes: 15,
    comments: 4,
  },
];

const statusIconMap = {
  [FeedbackStatus.PENDING]: <CircleDashed className="size-5 text-gray-400" />,
  [FeedbackStatus.APPROVED]: (
    <CircleDotDashed className="size-5 text-emerald-400" />
  ),
  [FeedbackStatus.IN_PROGRESS]: (
    <CircleDot className="size-5 text-violet-400" />
  ),
  [FeedbackStatus.DONE]: <CircleCheck className="size-5 text-blue-400" />,
  [FeedbackStatus.CANCELLED]: <CircleMinus className="size-5 text-red-400" />,
};

const Page = () => {
  const [sortedFeedbacks, setSortedFeedbacks] = useState(() => {
    const tempFeedbacks: FeedbackState = {
      [FeedbackStatus.PENDING]: [],
      [FeedbackStatus.APPROVED]: [],
      [FeedbackStatus.IN_PROGRESS]: [],
      [FeedbackStatus.DONE]: [],
      [FeedbackStatus.CANCELLED]: [],
    };

    feedbacks.forEach((feedback) =>
      tempFeedbacks[feedback.status].push(feedback)
    );

    return tempFeedbacks;
  });

  return (
    <div className="px-3 lg:px-9 overflow-x-auto max-w-screen-lg mx-auto py-12 h-[calc(100vh-64px)]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-semibold text-xl lg:text-2xl">Roadmap</h3>
        <AddPublicFeedback />
      </div>
      <div className="flex gap-3">
        {columns.map((column, index) => (
          <div
            className="h-full px-1 flex-1 space-y-4 overflow-y-auto"
            key={column}
          >
            <div className="flex items-center space-x-2 rounded-md bg-gray-100 p-2.5 sticky top-0 z-10">
              {statusIconMap[column]}
              <span className="font-medium text-sm">
                {snakeCaseToString(column)}
              </span>
              <span className="bg-white px-2.5 py-0.5 border rounded-full text-xs font-semibold">
                {sortedFeedbacks[column].length}
              </span>
            </div>
            <div className="space-y-2.5">
              {sortedFeedbacks[column].map((feedback, index) => (
                <div
                  className="mt-2 p-4 sm:p-5 bg-background rounded-md flex flex-col gap-4 relative"
                  key={feedback.title}
                >
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
                    <button
                      className={cn(
                        'flex gap-1.5 items-center text-xs font-bold rounded-lg py-1.5 px-3 bg-primary/10 hover:bg-primary/20 transition-all'
                      )}
                    >
                      <ChevronUp
                        className={cn('size-4 text-primary')}
                        strokeWidth={3}
                      />
                      <span>{feedback.upvotes}</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="size-4 text-muted-foreground" />
                      <span className="font-semibold text-xs">
                        {feedback.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
