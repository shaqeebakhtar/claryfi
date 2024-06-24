import FeedbackCard from '@/app/(board)/_components/feedback';
import MaxWidthContainer from '@/components/max-width-container';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type BoardAdminDashboardProps = {};

const BoardAdminDashboard = ({}: BoardAdminDashboardProps) => {
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
        </div>
        <ul className="space-y-5 mb-10">
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
        </ul>
      </MaxWidthContainer>
    </>
  );
};

export default BoardAdminDashboard;
