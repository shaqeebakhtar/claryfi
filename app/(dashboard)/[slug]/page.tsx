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

const Page = () => {
  const { data: session, status } = useSession();
  const { slug } = useParams<{ slug: string }>();

  if ((!session || !session?.user) && status !== 'loading') {
    redirect(`/login?next=/${slug}`);
  }

  const { data: feedbacks, isPending } = useQuery({
    queryKey: ['feedbacks', slug],
    queryFn: () => getFeedbacksByBoardSlug({ slug, sortBy: 'most-upvotes' }),
  });

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
              <div className="space-x-4">
                <Link
                  target="_blank"
                  href={`/b/${slug}`}
                  className={cn(buttonVariants({ variant: 'secondary' }))}
                >
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Preview
                </Link>
                <CopyLinkButton value={`/b/${slug}`} />
              </div>
            </div>
          </div>
        </header>
        <div className="ml-auto px-3 lg:px-8 mt-6">
          <AddDashboardFeedback />
        </div>
        <KanbanBoard />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
