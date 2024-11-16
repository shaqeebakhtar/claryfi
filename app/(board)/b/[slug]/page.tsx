'use client';
import MaxWidthContainer from '@/components/max-width-container';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AddFeedbackDialog from '../../../(dashboard)/_components/add-dashboard-feedback';
import FeedbackCards from '../../_components/feedback-cards';
import PublicBoardHeader from '../../_components/public-board-header';
import { useState } from 'react';

const PublicFeedbackBoard = () => {
  const [sortBy, setSortBy] = useState('most-upvotes');

  return (
    <>
      <PublicBoardHeader />
      <MaxWidthContainer className="my-8">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <Select
            defaultValue="most-upvotes"
            value={sortBy}
            onValueChange={(value: string) => setSortBy(value)}
          >
            <SelectTrigger className="w-full sm:w-56 bg-background h-10">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent defaultValue="most-upvotes">
              <SelectItem value="most-upvotes">Most Upvotes</SelectItem>
              <SelectItem value="least-upvotes">Least Upvotes</SelectItem>
              <SelectItem value="most-comments">Most Comments</SelectItem>
              <SelectItem value="least-comments">Least Comments</SelectItem>
              <SelectItem value="latest">Latest</SelectItem>
            </SelectContent>
          </Select>
          <AddFeedbackDialog />
        </div>
        <FeedbackCards sortBy={sortBy} />
      </MaxWidthContainer>
    </>
  );
};

export default PublicFeedbackBoard;
