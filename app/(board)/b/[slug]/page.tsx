import MaxWidthContainer from '@/components/max-width-container';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AddFeedbackDialog from '../../_components/add-feedback-dialog';
import FeedbackCards from '../../_components/feedback-cards';
import PublicBoardHeader from '../../_components/public-board-header';

const PublicFeedbackBoard = () => {
  return (
    <>
      <PublicBoardHeader />
      <MaxWidthContainer className="my-8">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <Select>
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
        <FeedbackCards />
      </MaxWidthContainer>
    </>
  );
};

export default PublicFeedbackBoard;
