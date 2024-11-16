'use client';
import AdminFeedbackCards from '@/app/(board)/_components/admin-feedback-cards';
import { FeedbackCardSkeleton } from '@/app/(dashboard)/_components/dashboard-feedback-card';
import MaxWidthContainer from '@/components/max-width-container';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { getBoardBySlug } from '@/data-access/board';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { notFound, redirect } from 'next/navigation';
import { useState } from 'react';

type BoardAdminDashboardProps = {
  params: { slug: string };
};

const BoardAdminDashboard = ({ params }: BoardAdminDashboardProps) => {
  const [sortBy, setSortBy] = useState('most-upvotes');
  const { data: session, status } = useSession();

  if ((!session || !session?.user) && status !== 'loading') {
    redirect(`/login?next=/b/${params.slug}/admin`);
  }

  const { data: board, isPending } = useQuery({
    queryKey: ['board', params.slug],
    queryFn: () => getBoardBySlug({ slug: params.slug }),
  });

  if (isPending) {
    return <BoardAdminDashboardSkeleton />;
  }

  if (!board) {
    return notFound();
  }

  return (
    <>
      <div className="flex h-32 items-center border-b border-gray-200">
        <MaxWidthContainer>
          <h1 className="text-2xl font-medium tracking-tight text-foreground">
            Feedbacks
          </h1>
        </MaxWidthContainer>
      </div>
      <MaxWidthContainer>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end pt-6 mb-5">
          <Select
            defaultValue="most-upvotes"
            value={sortBy}
            onValueChange={(value: string) => setSortBy(value)}
          >
            <SelectTrigger className="w-full sm:w-56 bg-background h-10">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="most-upvotes">Most Upvotes</SelectItem>
              <SelectItem value="least-upvotes">Least Upvotes</SelectItem>
              <SelectItem value="most-comments">Most Comments</SelectItem>
              <SelectItem value="least-comments">Least Comments</SelectItem>
              <SelectItem value="latest">Latest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <AdminFeedbackCards sortBy={sortBy} />
      </MaxWidthContainer>
    </>
  );
};

export default BoardAdminDashboard;

export const BoardAdminDashboardSkeleton = () => {
  return (
    <>
      <div className="flex h-32 items-center border-b border-gray-200">
        <MaxWidthContainer>
          <h1 className="text-2xl font-medium tracking-tight text-foreground">
            Feedbacks
          </h1>
        </MaxWidthContainer>
      </div>
      <MaxWidthContainer>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end pt-6 mb-5">
          <Skeleton className="w-full sm:w-56 bg-background h-10 border border-input rounded-md" />
        </div>
        <ul className="space-y-5 mb-10">
          {[...Array(3)].map((_, index) => (
            <FeedbackCardSkeleton key={index} />
          ))}
        </ul>
      </MaxWidthContainer>
    </>
  );
};
