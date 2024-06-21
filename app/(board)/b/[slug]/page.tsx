import MaxWidthContainer from '@/components/max-width-container';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AddFeedbackDialog from '../../_components/add-feedback-dialog';
import Feedback from '../../_components/feedback';

const FeedbackBoard = () => {
  return (
    <MaxWidthContainer>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <Select>
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

        <AddFeedbackDialog />
      </div>
      <ul className="space-y-5">
        <Feedback />
        <Feedback />
        <Feedback />
        <Feedback />
      </ul>
    </MaxWidthContainer>
  );
};

export default FeedbackBoard;
