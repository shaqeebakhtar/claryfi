'use client';
import { AppSidebar } from '@/components/app-sidebar';
import CopyLinkButton from '@/components/copy-link-button';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { getFeedbacksByBoardSlug } from '@/data-access/feedback';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { EyeIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import { KanbanBoard } from '../_components/kanban-board';
import { AddDashboardFeedback } from '../_components/add-dashboard-feedback';

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
  const { data: session, status } = useSession();
  const { slug } = useParams<{ slug: string }>();

  if ((!session || !session?.user) && status !== 'loading') {
    redirect(`/login?next=/${slug}`);
  }

  // const { data: feedbacks, isPending } = useQuery({
  //   queryKey: ['feedbacks', slug],
  //   queryFn: () => getFeedbacksByBoardSlug({ slug, sortBy: 'most-upvotes' }),
  // });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden h-[calc(100vh-16px)]">
        <header className="w-full flex h-16 shrink-0 items-center gap-2">
          <div className="w-full flex items-center gap-2 px-8">
            <SidebarTrigger className="-ml-1 text-muted-foreground" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="w-full flex items-center justify-between">
              <h1 className="text-2xl font-medium">Feedbacks</h1>
              <div className="space-x-3">
                <Link
                  target="_blank"
                  href={`/b/${slug}`}
                  className={cn(buttonVariants({ variant: 'secondary' }))}
                >
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Preview
                </Link>
                <CopyLinkButton value={`/b/${slug}`} />
                <AddDashboardFeedback />
              </div>
            </div>
          </div>
        </header>
        <KanbanBoard feedbacks={feedbacks} />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
