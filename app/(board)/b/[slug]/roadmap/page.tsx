'use client';
import AddPublicFeedback from '@/app/(board)/_components/add-public-feedback';
import FeedbackDisplaySheet from '@/app/(board)/_components/feedback-display-sheet';
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const feedbackId = searchParams.get('f');

  const { data: feedbacks, isLoading } = useQuery({
    queryKey: [slug, 'feedbacks'],
    queryFn: () => getPublicFeedbacks({ slug }),
  });
  const [sortedFeedbacks, setSortedFeedbacks] = useState<FeedbackState>();

  const tagColors = [
    {
      name: 'Gray',
      tagClass: 'bg-gray-50 text-gray-600 border border-gray-200',
      buttonClass: 'bg-gray-500',
    },
    {
      name: 'Red',
      tagClass: 'bg-red-50 text-red-600 border border-red-200',
      buttonClass: 'bg-red-500',
    },
    {
      name: 'Orange',
      tagClass: 'bg-orange-50 text-orange-600 border border-orange-200',
      buttonClass: 'bg-orange-500',
    },
    {
      name: 'Cyan',
      tagClass: 'bg-cyan-50 text-cyan-600 border border-cyan-200',
      buttonClass: 'bg-cyan-500',
    },
    {
      name: 'Green',
      tagClass: 'bg-green-50 text-green-600 border border-green-200',
      buttonClass: 'bg-green-500',
    },
    {
      name: 'Blue',
      tagClass: 'bg-blue-50 text-blue-600 border border-blue-200',
      buttonClass: 'bg-blue-500',
    },
    {
      name: 'Yellow',
      tagClass: 'bg-yellow-50 text-yellow-600 border border-yellow-200',
      buttonClass: 'bg-yellow-500',
    },
    {
      name: 'Purple',
      tagClass: 'bg-purple-50 text-purple-600 border border-purple-200',
      buttonClass: 'bg-purple-500',
    },
  ];

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
    <div className="px-3 lg:px-9 overflow-x-auto max-w-screen-lg mx-auto py-12 h-[calc(100vh-64px)]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-semibold text-xl lg:text-2xl">Roadmap</h3>
        <AddPublicFeedback />
      </div>
      <div className="flex gap-3">
        {columns.map((column) => (
          <div
            className="h-full px-1 flex-1 space-y-4 overflow-y-auto"
            key={column}
          >
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
                  <div
                    className="mt-2 p-4 sm:p-5 bg-background rounded-md flex flex-col gap-4 relative"
                    key={feedback.id}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5">
                        {feedback.tags.map((tag) => (
                          <div
                            key={tag.tag.name}
                            className={cn(
                              'text-xs font-medium px-2 py-0.5 rounded-sm',
                              tagColors.find(
                                (color) =>
                                  color.name.toLowerCase() ===
                                  tag.tag.color.toLowerCase()
                              )?.tagClass
                            )}
                          >
                            {tag.tag.name}
                          </div>
                        ))}
                      </div>
                      <div
                        className="space-y-0.5 group cursor-pointer"
                        onClick={() =>
                          router.push(`${pathname}?f=${feedback.id}`, {
                            scroll: false,
                          })
                        }
                      >
                        <h3 className="font-medium group-hover:text-primary transition-all">
                          {feedback.title}
                        </h3>
                        <p
                          className="feedback--desc text-muted-foreground text-sm line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: feedback.description,
                          }}
                        ></p>
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
                        <span>{feedback._count.upvotes}</span>
                      </button>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="size-4 text-muted-foreground" />
                        <span className="font-semibold text-xs">
                          {feedback._count.comments}
                        </span>
                      </div>
                    </div>
                  </div>
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

const RoadmapFeedbackCardSkeleton = () => {
  return (
    <div className="mt-2 p-4 sm:p-5 bg-background rounded-md flex flex-col gap-4 relative">
      <div className="space-y-3">
        <div className="flex items-center gap-1.5">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-20 h-6" />
        </div>
        <div className="space-y-0.5">
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-64 h-4" />
          <Skeleton className="w-56 h-4" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="w-14 h-7 rounded-lg" />
        <Skeleton className="size-7 rounded-lg" />
      </div>
    </div>
  );
};
