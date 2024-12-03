import BoardName from '@/app/(dashboard)/_components/board-name';
import BoardSlug from '@/app/(dashboard)/_components/board-slug';
import UploadLogo from '@/app/(dashboard)/_components/upload-logo';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import React from 'react';

const Page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden h-[calc(100vh-16px)]">
        <header className="w-full flex h-16 shrink-0 items-center gap-2">
          <div className="w-full flex items-center gap-2 px-3 lg:px-8">
            <SidebarTrigger className="-ml-1 text-muted-foreground" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="w-full flex items-center justify-between gap-4">
              <h1 className="text-xl lg:text-2xl font-medium">General</h1>
            </div>
          </div>
        </header>
        <div className="w-full px-3 lg:px-8 lg:mt-4 divide-y divide-gray-100 space-y-8">
          <UploadLogo />
          <BoardName />
          <BoardSlug />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
