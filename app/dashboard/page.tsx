import { auth } from '@/lib/auth';
import BoardDisplayGrid from './_components/board-display-grid';
import CreateBoardDialog from './_components/create-board-dialog';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <>
      <div className="flex h-28 items-center">
        <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium">My Boards</h1>
            <CreateBoardDialog />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20 flex flex-col space-y-4 py-4 pb-20">
        <BoardDisplayGrid />
      </div>
    </>
  );
};

export default Dashboard;
