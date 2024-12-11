'use client';
import { CreateTag } from '@/app/(dashboard)/_components/create-edit-tag';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';
import { redirect, useParams } from 'next/navigation';

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
          <div className="w-full flex items-center gap-2 px-3 lg:px-8">
            <SidebarTrigger className="-ml-1 text-muted-foreground" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="w-full flex items-center justify-between gap-4">
              <h1 className="text-xl lg:text-2xl font-medium">Tags</h1>
              <CreateTag />
            </div>
          </div>
        </header>
        <div className="w-full max-w-screen-xl mx-auto"></div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
