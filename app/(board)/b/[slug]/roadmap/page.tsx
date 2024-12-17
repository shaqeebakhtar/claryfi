'use client';
import AddPublicFeedback from '@/app/(board)/_components/add-public-feedback';
import FeedbackDisplaySheet from '@/app/(board)/_components/feedback-display-sheet';
import RoadmapFeedbackCard, {
  RoadmapFeedbackCardSkeleton,
} from '@/app/(board)/_components/roadmap-feedback-card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, snakeCaseToString } from '@/lib/utils';
import { getPublicFeedbacks } from '@/services/open/feedback';
import { FeedbackStatus, IFeedback } from '@/types/feedback';
import { useQuery } from '@tanstack/react-query';
import {
  ChevronUp,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  CircleMinus,
  MessageCircle,
} from 'lucide-react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useState } from 'react';

const columns = [
  FeedbackStatus.APPROVED,
  FeedbackStatus.IN_PROGRESS,
  FeedbackStatus.DONE,
];

type FeedbackState = {
  [key in FeedbackStatus]: IFeedback[];
};

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
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const feedbackId = searchParams.get('f');

  const { data: feedbacks, isLoading } = useQuery({
    queryKey: [slug, 'feedbacks'],
    queryFn: () => getPublicFeedbacks({ slug }),
  });
  const [sortedFeedbacks, setSortedFeedbacks] = useState<FeedbackState>();

  useEffect(() => {
    if (!isLoading && feedbacks) {
      setSortedFeedbacks(() => {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, feedbacks]);

  return (
    <div className="px-3 lg:px-9 overflow-x-auto max-w-screen-lg mx-auto py-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-semibold text-xl lg:text-2xl">Roadmap</h3>
        <AddPublicFeedback />
      </div>
      <div className="flex gap-3">
        {columns.map((column) => (
          <div className="px-1 flex-1 space-y-4" key={column}>
            <div className="flex items-center space-x-2 rounded-md bg-gray-100 p-2.5 sticky top-0 z-10">
              {statusIconMap[column]}
              <span className="font-medium text-sm">
                {snakeCaseToString(column)}
              </span>
              {isLoading ? (
                <Skeleton className="w-7 h-5 rounded-full bg-white" />
              ) : (
                <span className="bg-white px-2.5 py-0.5 border rounded-full text-xs font-semibold">
                  {sortedFeedbacks && sortedFeedbacks[column].length}
                </span>
              )}
            </div>
            <div className="space-y-2.5">
              {isLoading ? (
                [...Array(3)].map((_, index) => (
                  <RoadmapFeedbackCardSkeleton key={index} />
                ))
              ) : sortedFeedbacks && sortedFeedbacks[column].length > 0 ? (
                sortedFeedbacks[column].map((feedback) => (
                  <RoadmapFeedbackCard key={feedback.id} feedback={feedback} />
                ))
              ) : (
                <div className="h-1/2 flex flex-col items-center justify-center space-y-6">
                  <div className="space-y-3 px-4 w-full max-w-sm relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50/0 via-gray-50/0 to-gray-50/75" />
                    <div className="w-full space-y-2 rounded-md bg-white p-3 shadow-sm">
                      <div className="h-3 max-w-[90%] rounded-sm bg-[#ecedef]" />
                      <div className="h-3 max-w-[50%] rounded-sm bg-[#ecedef]" />
                    </div>
                    <div className="w-full space-y-2 rounded-md bg-white p-3 shadow-sm">
                      <div className="h-3 max-w-[90%] rounded-sm bg-[#ecedef]" />
                      <div className="h-3 max-w-[50%] rounded-sm bg-[#ecedef]" />
                    </div>
                    <div className="w-full space-y-2 rounded-md bg-white p-3">
                      <div className="h-3 max-w-[90%] rounded-sm bg-[#ecedef]" />
                      <div className="h-3 max-w-[50%] rounded-sm bg-[#ecedef]" />
                    </div>
                  </div>
                  <p className="font-medium text-center text-muted-foreground">
                    No feedbacks yet
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {feedbackId && <FeedbackDisplaySheet feedbackId={feedbackId} />}
    </div>
  );
};

export default Page;
