'use client';

import React from 'react';
import FeedbackCard, { FeedbackCardSkeleton } from './feedback';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getFeedbacksByBoardSlug } from '@/data-access/feedback';
import { Feedback, Upvote } from '@prisma/client';
import { FileX2 } from 'lucide-react';
import Image from 'next/image';

const FeedbackCards = () => {
  const { slug } = useParams() as { slug: string };

  const { data: feedbacks, isPending } = useQuery({
    queryKey: ['feedbacks', slug],
    queryFn: () => getFeedbacksByBoardSlug(slug),
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

  if (feedbacks.length === 0) {
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
        Share this board to your users and start collecting feedbacks.
      </p>
      <Image
        src="/people-finder.png"
        alt="No links yet"
        width={400}
        height={400}
      />
    </div>
  );
};
