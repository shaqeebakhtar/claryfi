import { auth } from '@/lib/auth';
import BoardDisplayGrid from './_components/board-display-grid';
import CreateBoardDialog from './_components/create-board-dialog';
import { redirect } from 'next/navigation';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';

const Dashboard = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="w-full flex h-16 shrink-0 items-center gap-2">
          <div className="w-full flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-muted-foreground" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="w-full flex items-center justify-between">
              <h1 className="text-2xl font-medium">My Boards</h1>
            </div>
          </div>
        </header>
        <div className="mx-auto w-full px-3 lg:px-20 flex flex-col space-y-4 py-4 pb-20">
          <BoardDisplayGrid />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
