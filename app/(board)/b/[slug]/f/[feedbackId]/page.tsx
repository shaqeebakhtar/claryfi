'use client';
import Comments, { CommentsSkeleton } from '@/app/(board)/_components/comments';
import EditFeedbackDialog from '@/app/(board)/_components/edit-feedback-dialog';
import FeedbackCard, {
  FeedbackCardSkeleton,
} from '@/app/(dashboard)/_components/dashboard-feedback-card';
import PostComment, {
  PostCommentSkeleton,
} from '@/app/(board)/_components/post-comment';
import PublicBoardHeader from '@/app/(board)/_components/public-board-header';
import BackButton from '@/components/back-button';
import MaxWidthContainer from '@/components/max-width-container';
import { Skeleton } from '@/components/ui/skeleton';
import { getFeedbackById } from '@/data-access/feedback';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { notFound, useParams } from 'next/navigation';

const IndividualFeedbackPage = () => {
  const { data: session } = useSession();
  const { slug, feedbackId } = useParams() as {
    slug: string;
    feedbackId: string;
  };

  const { data: feedback, isPending } = useQuery({
    queryKey: ['feedback', feedbackId],
    queryFn: () => getFeedbackById({ slug, feedbackId }),
  });

  if (isPending) {
    return (
      <>
        <PublicBoardHeader />
        <MaxWidthContainer className="my-8">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Skeleton className="w-9 h-9 rounded-lg" />
                <Skeleton className="w-20 h-4" />
              </div>
              <Skeleton className="w-48 h-10 rounded-lg" />
            </div>
            <FeedbackCardSkeleton />
            <PostCommentSkeleton />
            <CommentsSkeleton />
          </div>
        </MaxWidthContainer>
      </>
    );
  }

  if (!feedback) {
    notFound();
  }

  return (
    <>
      <PublicBoardHeader />
      <MaxWidthContainer className="my-8">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <BackButton />
            {(session?.user || session?.user.id === feedback.submittedBy) && (
              <EditFeedbackDialog feedback={feedback} />
            )}
          </div>
          <FeedbackCard feedback={feedback} />
          <PostComment />
          <Comments />
        </div>
      </MaxWidthContainer>
    </>
  );
};

export default IndividualFeedbackPage;
