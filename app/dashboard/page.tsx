import React from 'react';
import CreateBoardDialog from './_components/create-board-dialog';
import BoardCard from './_components/board-card';

const Dashboard = () => {
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
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          <BoardCard />
          <BoardCard />
          <BoardCard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
