'use client';
import { useIsClient } from '@uidotdev/usehooks';
import { useParams, useSearchParams } from 'next/navigation';
import AddPublicFeedback from '../../_components/add-public-feedback';
import FeedbackCard, {
  FeedbackCardSkeleton,
} from '../../_components/feedback-card';
import FeedbackDisplaySheet from '../../_components/feedback-display-sheet';
import RoadmapCard, {
  RoadmapCardSkeleton,
} from '../../_components/roadmap-card';
import { useIsFetching, useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { getPublicBoardBySlug } from '@/services/open/board';

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

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const feedbackId = searchParams.get('f');

  // const isFetchingBoard = useIsFetching({
  //   queryKey: ['board', 'open', slug],
  // });

  const { data: board, isLoading } = useQuery({
    queryKey: ['board', 'open', slug],
    queryFn: () => getPublicBoardBySlug({ slug }),
  });

  console.log(board?.feedbacks);

  return (
    <>
      <div className="mx-auto w-full max-w-screen-lg px-2.5 lg:px-10 flex flex-col py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-xl lg:text-2xl">Feedbacks</h3>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-2">
              {isLoading
                ? [...Array(6)].map((_, index) => (
                    <FeedbackCardSkeleton key={index} />
                  ))
                : board?.feedbacks.map((feedback, index) => (
                    <>
                      <FeedbackCard feedback={feedback} key={index} />
                    </>
                  ))}
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
                <RoadmapCard />
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
