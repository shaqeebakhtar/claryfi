import React from 'react';
import CreateBoardDialog from './_components/create-board-dialog';

const Dashboard = () => {
  return (
    <>
      <div className="flex h-28 items-center">
        <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">My Boards</h1>
            <CreateBoardDialog />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
