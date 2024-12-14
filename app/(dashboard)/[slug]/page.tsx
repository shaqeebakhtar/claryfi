'use client';
import FeedbackDisplaySheet from '@/app/(board)/_components/feedback-display-sheet';
import { AppSidebar } from '@/components/app-sidebar';
import CopyLinkButton from '@/components/copy-link-button';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { getBoardBySlug } from '@/services/admin/board';
import { useQuery } from '@tanstack/react-query';
import { ExternalLinkIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  notFound,
  redirect,
  useParams,
  useSearchParams,
} from 'next/navigation';
import { AddDashboardFeedback } from '../_components/add-dashboard-feedback';
import { KanbanBoard } from '../_components/kanban-board';

const Page = () => {
  const { data: session, status } = useSession();
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const feedbackId = searchParams.get('f');

  const { data: board, isLoading } = useQuery({
    queryKey: [slug, 'board'],
    queryFn: () => getBoardBySlug({ slug }),
  });

  if ((!session || !session?.user) && status !== 'loading') {
    redirect(`/login?next=/${slug}`);
  }

  if (isLoading) {
    return null;
  }

  if (!board) {
    notFound();
  }

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
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'icon' })
                  )}
                >
                  <ExternalLinkIcon className="w-4 h-4" />
                  <span className="sr-only">Preview</span>
                </Link>
                <CopyLinkButton value={`/b/${slug}`} />
                <AddDashboardFeedback />
              </div>
            </div>
          </div>
        </header>
        <KanbanBoard />
        {feedbackId && <FeedbackDisplaySheet feedbackId={feedbackId} />}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
