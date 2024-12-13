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
import { cn } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import { AddDashboardFeedback } from '../_components/add-dashboard-feedback';
import { KanbanBoard } from '../_components/kanban-board';

const Page = () => {
  const { data: session, status } = useSession();
  const { slug } = useParams<{ slug: string }>();

  if ((!session || !session?.user) && status !== 'loading') {
    redirect(`/login?next=/${slug}`);
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
                  className={cn(buttonVariants({ variant: 'secondary' }))}
                >
                  <EyeIcon className="w-4 h-4" />
                  <span className="hidden ml-2 md:block">Preview</span>
                </Link>
                <CopyLinkButton value={`/b/${slug}`} />
                <AddDashboardFeedback />
              </div>
            </div>
          </div>
        </header>
        <KanbanBoard />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
