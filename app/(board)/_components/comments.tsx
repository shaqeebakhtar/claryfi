'use client';

import React from 'react';
import Comment from './comment';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCommentsByFeedbackId } from '@/data-access/comment';
import { Comment as TComment } from '@prisma/client';

const Comments = () => {
  const { slug, feedbackId } = useParams() as {
    slug: string;
    feedbackId: string;
  };

  const { data: comments, isPending } = useQuery({
    queryKey: ['comments', feedbackId],
    queryFn: () => getCommentsByFeedbackId({ slug, feedbackId }),
  });

  if (isPending) {
    return (
      <div className="p-6 sm:p-8 bg-background rounded-xl shadow space-y-2">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 bg-background rounded-xl shadow space-y-2">
      <h3 className="font-bold text-base md:text-lg">
        {comments.length} Comment{comments.length !== 1 && 's'}
      </h3>
      <ul className="divide-y-2 space-y-6">
        {comments.map((comment: TComment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default Comments;
