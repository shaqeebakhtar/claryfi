'use client';

import { getFeedbacksByBoardSlug } from '@/data-access/feedback';
import { Feedback, Upvote } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { FileX2 } from 'lucide-react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { AddDashboardFeedback } from '../../(dashboard)/_components/add-dashboard-feedback';
import FeedbackCard, {
  FeedbackCardSkeleton,
} from '../../(dashboard)/_components/dashboard-feedback-card';

const FeedbackCards = ({ sortBy }: { sortBy: string }) => {
  const { slug } = useParams() as { slug: string };

  const { data: feedbacks, isPending } = useQuery({
    queryKey: ['feedbacks', slug, sortBy],
    queryFn: () => getFeedbacksByBoardSlug({ slug, sortBy }),
  });

  if (isPending) {
    return (
      <ul className="space-y-5">
        {[...Array(3)].map((_, i) => (
          <FeedbackCardSkeleton key={i} />
        ))}
      </ul>
    );
  }

  if (!feedbacks) {
    return notFound();
  }

  if (feedbacks?.length === 0) {
    return <NoFeedbacks />;
  }

  return (
    <ul className="space-y-5 mb-10">
      {feedbacks.map(
        (
          feedback: Feedback & {
            upvotes: Upvote[];
            _count: {
              upvotes: number;
              comments: number;
            };
          }
        ) => (
          <FeedbackCard key={feedback.id} feedback={feedback} />
        )
      )}
    </ul>
  );
};

export default FeedbackCards;

const NoFeedbacks = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center rounded-md border border-gray-200 bg-background py-12 px-6">
      <div className="rounded-full bg-gray-100 p-3">
        <FileX2 className="h-6 w-6 text-gray-600" />
      </div>
      <h1 className="my-3 text-xl font-semibold">
        There&apos;s No Feedbacks Yet
      </h1>
      <p className="max-w-sm text-center text-sm text-muted-foreground mb-8">
        Be the first one to add a feedback. You can add one using &quot;Add
        feedback&quot; button.
      </p>
      <AddDashboardFeedback />
      <Image
        src="/people-finder.png"
        alt="No links yet"
        width={400}
        height={400}
        className="mt-8"
      />
    </div>
  );
};
