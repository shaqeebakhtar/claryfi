'use client';

import React from 'react';
import Comment, { CommentSkeleton } from './comment';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCommentsByFeedbackId } from '@/data-access/comment';
import { Comment as TComment } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';

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
        {[...Array(3)].map((_, index) => (
          <CommentSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="p-6 sm:p-8 bg-background rounded-xl shadow space-y-2">
        <h3 className="text-base md:text-lg font-semibold">No Comments Yet</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Be the first one to post a comment
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 bg-background rounded-xl shadow space-y-2">
      <h3 className="font-semibold text-base md:text-lg">
        {comments.length} Comment{comments.length !== 1 && 's'}
      </h3>
      <ul className="divide-y-2 divide-muted space-y-8">
        {comments.map((comment: TComment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default Comments;

export const CommentsSkeleton = () => {
  return (
    <div className="p-6 sm:p-8 bg-background rounded-xl shadow space-y-2">
      <Skeleton className="w-32 h-6" />
      <ul className="divide-y-2 divide-muted space-y-8">
        {[...Array(3)].map((_, index) => (
          <CommentSkeleton key={index} />
        ))}
      </ul>
    </div>
  );
};
