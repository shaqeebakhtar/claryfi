import { Skeleton } from '@/components/ui/skeleton';
import { snakeCaseToString } from '@/lib/utils';
import { FeedbackStatus, IFeedback } from '@/types/feedback';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

const columns = [
  FeedbackStatus.APPROVED,
  FeedbackStatus.IN_PROGRESS,
  FeedbackStatus.DONE,
];

type FeedbackState = {
  [key in FeedbackStatus]: IFeedback[];
};

const statusIconMap = {
  [FeedbackStatus.PENDING]: (
    <div className="relative inline-flex rounded-full h-2.5 w-2.5 aspect-square bg-gray-400" />
  ),
  [FeedbackStatus.APPROVED]: (
    <div className="relative inline-flex rounded-full h-2.5 w-2.5 aspect-square bg-emerald-400" />
  ),
  [FeedbackStatus.IN_PROGRESS]: (
    <div className="relative inline-flex rounded-full h-2.5 w-2.5 aspect-square bg-violet-400" />
  ),
  [FeedbackStatus.DONE]: (
    <div className="relative inline-flex rounded-full h-2.5 w-2.5 aspect-square bg-blue-400" />
  ),
  [FeedbackStatus.CANCELLED]: (
    <div className="relative inline-flex rounded-full h-2.5 w-2.5 aspect-square bg-red-400" />
  ),
};

const RoadmapCard = ({ feedbacks }: { feedbacks: IFeedback[] | undefined }) => {
  const { slug } = useParams<{ slug: string }>();
  const [sortedFeedbacks, setSortedFeedbacks] = useState<FeedbackState>(() => {
    const groupedFeedbacksByStatus: FeedbackState = {
      [FeedbackStatus.PENDING]: [],
      [FeedbackStatus.APPROVED]: [],
      [FeedbackStatus.IN_PROGRESS]: [],
      [FeedbackStatus.DONE]: [],
      [FeedbackStatus.CANCELLED]: [],
    };

    feedbacks?.forEach((feedback) =>
      groupedFeedbacksByStatus[feedback.status].push(feedback)
    );

    return groupedFeedbacksByStatus;
  });

  return (
    <div className="sm:flex-1 lg:flex-grow-0 p-4 sm:p-5 bg-background rounded-md">
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <h3 className="text-lg font-semibold">Roadmap</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            Upcoming features and fixes
          </p>
        </div>
        <Link
          href={`/b/${slug}/roadmap`}
          className="text-xs text-primary underline underline-offset-2 py-1"
        >
          View
        </Link>
      </div>
      <div className="mt-6 space-y-4">
        {columns.map((column) => (
          <div className="flex items-center justify-between" key={column}>
            <div className="flex items-center gap-2.5 text-sm leading-none font-medium w-max text-muted-foreground">
              {statusIconMap[column]}
              <span className="mt-0.5">{snakeCaseToString(column)}</span>
            </div>
            <span className="px-2.5 py-0.5 border rounded-full text-xs font-semibold">
              {sortedFeedbacks && sortedFeedbacks[column].length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapCard;

export const RoadmapCardSkeleton = () => {
  return (
    <div className="sm:flex-1 lg:flex-grow-0 p-4 sm:p-5 bg-background rounded-md">
      <div className="flex items-start justify-between">
        <div className="space-y-2.5">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-36 h-4" />
        </div>
        <Skeleton className="w-12 h-4" />
      </div>
      <div className="mt-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-sm leading-none font-medium w-max text-muted-foreground">
            <Skeleton className="size-2.5 rounded-full" />
            <Skeleton className="w-24 h-4" />
          </div>
          <Skeleton className="w-8 h-5 rounded-xl" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-sm leading-none font-medium w-max text-muted-foreground">
            <Skeleton className="size-2.5 rounded-full" />
            <Skeleton className="w-24 h-4" />
          </div>
          <Skeleton className="w-8 h-5 rounded-xl" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-sm leading-none font-medium w-max text-muted-foreground">
            <Skeleton className="size-2.5 rounded-full" />
            <Skeleton className="w-24 h-4" />
          </div>
          <Skeleton className="w-8 h-5 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
