'use client';

import React from 'react';
import FeedbackCard, { FeedbackCardSkeleton } from './feedback';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getFeedbacksByBoardSlug } from '@/data-access/feedback';
import { Feedback } from '@prisma/client';

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
    return <h1>No feedbacks</h1>;
  }

  return (
    <ul className="space-y-5 mb-10">
      {feedbacks.map((feedback: Feedback) => (
        <FeedbackCard key={feedback.id} feedback={feedback} />
      ))}
    </ul>
  );
};

export default FeedbackCards;
