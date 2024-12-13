import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import DeleteBoardDialog from '../../_components/delete-board-dialog';
import SettingsForm from '../../_components/settings-form';
import ManageTags from '../../_components/manage-tags';

const Page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-[calc(100vh-16px)]">
        <header className="w-full flex h-16 shrink-0 items-center gap-2 sticky top-0 bg-background z-10">
          <div className="w-full flex items-center gap-2 px-3 lg:px-8">
            <SidebarTrigger className="-ml-1 text-muted-foreground" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="w-full flex items-center justify-between gap-4">
              <h1 className="text-xl lg:text-2xl font-medium">Settings</h1>
            </div>
          </div>
        </header>
        <div className="max-w-xl space-y-12 px-3 lg:px-8 py-8">
          <SettingsForm />
          <Separator orientation="horizontal" className="bg-gray-100" />
          <ManageTags />
          <Separator orientation="horizontal" className="bg-gray-100" />
          <div className="space-y-4 p-4 border border-destructive rounded-lg bg-destructive/5">
            <div className="space-y-1">
              <h2 className="text-base font-medium text-destructive">
                Delete Board
              </h2>
              <p className="text-sm text-muted-foreground">
                Deleting your board will also delete all the feedbacks and
                others things associated with it.
              </p>
            </div>
            <DeleteBoardDialog />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
