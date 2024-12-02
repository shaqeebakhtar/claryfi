import { AddDashboardFeedback } from '@/app/(dashboard)/_components/add-dashboard-feedback';
import FeedbackCard from '../../_components/feedback-card';
import RoadmapCard from '../../_components/roadmap-card';

enum FeedbackStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

type Feedback = {
  title: string;
  description: string;
  status: FeedbackStatus;
  upvotes: number;
  comments: number;
};

const feedbacks: Feedback[] = [
  {
    title: 'Add dark mode feature',
    description:
      'It would be great to have a dark mode option for better usability at night.',
    status: FeedbackStatus.PENDING,
    upvotes: 45,
    comments: 12,
  },
  {
    title: 'Fix login issue on mobile',
    description:
      'Users are unable to log in using the mobile app when on slower networks.',
    status: FeedbackStatus.APPROVED,
    upvotes: 30,
    comments: 8,
  },
  {
    title: 'Integrate payment gateway',
    description:
      'Add support for a popular payment gateway like PayPal or Stripe.',
    status: FeedbackStatus.IN_PROGRESS,
    upvotes: 60,
    comments: 15,
  },
  {
    title: 'Improve page loading speed',
    description:
      'Optimize the website to load faster, especially on older devices.',
    status: FeedbackStatus.DONE,
    upvotes: 100,
    comments: 25,
  },
  {
    title: 'Add multilingual support',
    description:
      'Enable users to switch between multiple languages on the platform.',
    status: FeedbackStatus.CANCELLED,
    upvotes: 20,
    comments: 5,
  },
  {
    title: 'Create a user onboarding tutorial',
    description:
      'A simple walkthrough to help new users understand the platform quickly.',
    status: FeedbackStatus.PENDING,
    upvotes: 35,
    comments: 9,
  },
  {
    title: 'Enhance accessibility features',
    description: 'Add screen reader support and better keyboard navigation.',
    status: FeedbackStatus.APPROVED,
    upvotes: 50,
    comments: 10,
  },
  {
    title: 'Implement two-factor authentication',
    description: 'Improve account security by adding 2FA via SMS or email.',
    status: FeedbackStatus.IN_PROGRESS,
    upvotes: 75,
    comments: 20,
  },
  {
    title: 'Redesign the dashboard layout',
    description: 'Make the dashboard more intuitive and visually appealing.',
    status: FeedbackStatus.DONE,
    upvotes: 95,
    comments: 30,
  },
  {
    title: 'Add support for file attachments in comments',
    description:
      'Allow users to upload files and images within their comments.',
    status: FeedbackStatus.PENDING,
    upvotes: 25,
    comments: 6,
  },
  {
    title: 'Provide an offline mode',
    description:
      'Enable basic functionalities to work without an internet connection.',
    status: FeedbackStatus.CANCELLED,
    upvotes: 15,
    comments: 4,
  },
];

const Page = () => {
  return (
    <div className="mx-auto w-full max-w-screen-lg px-2.5 lg:px-20 flex flex-col py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="flex flex-col items-end mb-4">
            <AddDashboardFeedback />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-2">
            {feedbacks.map((feedback, index) => (
              <FeedbackCard feedback={feedback} key={index} />
            ))}
          </div>
        </div>
        <div className="h-max flex flex-col sm:flex-row lg:flex-col gap-4 lg:sticky top-20">
          <RoadmapCard />
        </div>
      </div>
    </div>
  );
};

export default Page;
