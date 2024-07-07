'use client';
import Comments from '@/app/(board)/_components/comments';
import EditFeedbackDialog from '@/app/(board)/_components/edit-feedback-dialog';
import FeedbackCard from '@/app/(board)/_components/feedback';
import PostComment from '@/app/(board)/_components/post-comment';
import PublicBoardHeader from '@/app/(board)/_components/public-board-header';
import BackButton from '@/components/back-button';
import MaxWidthContainer from '@/components/max-width-container';
import { getFeedbackById } from '@/data-access/feedback';
import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

const IndividualFeedbackPage = () => {
  const { slug, feedbackId } = useParams() as {
    slug: string;
    feedbackId: string;
  };

  const { data: feedback, isPending } = useQuery({
    queryKey: ['feedback', feedbackId],
    queryFn: () => getFeedbackById({ slug, feedbackId }),
  });

  if (isPending) {
    return <h1>Loading...</h1>;
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
            <EditFeedbackDialog feedback={feedback} />
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
