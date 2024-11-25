'use client';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';
import { redirect, useParams } from 'next/navigation';
import { CreateTag } from '../../_components/create-tag';

const Page = () => {
  const { data: session, status } = useSession();
  const { slug } = useParams<{ slug: string }>();

  if ((!session || !session?.user) && status !== 'loading') {
    redirect(`/login?next=/${slug}/tags`);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden h-[calc(100vh-16px)]">
        <header className="w-full flex h-16 shrink-0 items-center gap-2">
          <div className="w-full flex items-center gap-2 px-8">
            <SidebarTrigger className="-ml-1 text-muted-foreground" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="w-full max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-3 lg:px-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-medium">Tags</h1>
              <p className="text-sm text-muted-foreground">
                Manage your feedbacks with customizable tags
              </p>
            </div>
            <CreateTag />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
