'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { getPublicBoardBySlug } from '@/services/open/board';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import AddPublicFeedback from '../../_components/add-public-feedback';
import FeedbackCard, {
  FeedbackCardSkeleton,
} from '../../_components/feedback-card';
import FeedbackDisplaySheet from '../../_components/feedback-display-sheet';
import RoadmapCard, {
  RoadmapCardSkeleton,
} from '../../_components/roadmap-card';

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const feedbackId = searchParams.get('f');

  const { data: board, isLoading } = useQuery({
    queryKey: ['board', 'open', slug],
    queryFn: () => getPublicBoardBySlug({ slug }),
  });

  return (
    <>
      <div className="mx-auto w-full max-w-screen-lg px-2.5 lg:px-10 flex flex-col py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              {isLoading ? (
                <Skeleton className="h-7 w-28" />
              ) : (
                <h3 className="font-semibold text-xl lg:text-2xl">Feedbacks</h3>
              )}
            </div>
            <div className="flex flex-col gap-4 lg:col-span-2">
              {isLoading ? (
                [...Array(6)].map((_, index) => (
                  <FeedbackCardSkeleton key={index} />
                ))
              ) : board && board.feedbacks.length > 0 ? (
                board?.feedbacks.map((feedback) => (
                  <FeedbackCard feedback={feedback} key={feedback.id} />
                ))
              ) : (
                <div className="h-[600px] flex flex-col items-center justify-center space-y-6">
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
                  <div className="space-y-1">
                    <p className="font-medium text-center text-muted-foreground">
                      No feedbacks yet
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Be the first one to submit a feedback
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="h-max flex flex-col sm:flex-row lg:flex-col gap-4 lg:sticky top-20 -order-1 lg:order-1">
            {isLoading ? (
              <>
                <Skeleton className="w-36 h-9 rounded-lg" />
                <RoadmapCardSkeleton />
              </>
            ) : (
              <>
                <AddPublicFeedback />
                <RoadmapCard feedbacks={board?.feedbacks} />
              </>
            )}
          </div>
        </div>
      </div>
      {feedbackId && <FeedbackDisplaySheet feedbackId={feedbackId} />}
    </>
  );
};

export default Page;
