'use client';

import { getBoards } from '@/data-access/board';
import { type Board } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { FileX2 } from 'lucide-react';
import Image from 'next/image';
import BoardCard, { BoardCardSkeleton } from './board-card';
import CreateBoardDialog from './create-board-dialog';

const BoardDisplayGrid = () => {
  const { data: boards, isPending } = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {[...Array(4)].map((_, i) => (
          <BoardCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (boards.length === 0) {
    return <NoBoards />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {boards.map(
        (
          board: Board & {
            _count: {
              feedbacks: number;
            };
          }
        ) => (
          <BoardCard key={board.id} board={board} />
        )
      )}
    </div>
  );
};

export default BoardDisplayGrid;

const NoBoards = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center rounded-md border border-gray-200 bg-background py-12 px-6">
      <div className="rounded-full bg-gray-100 p-3">
        <FileX2 className="h-6 w-6 text-gray-600" />
      </div>
      <h1 className="my-3 text-xl font-semibold">No Boards Found</h1>
      <p className="max-w-sm text-center text-sm text-muted-foreground mb-8">
        It seems you haven&apos;t created any boards yet. You can create one
        using &quot;Create Board&quot; button.
      </p>
      <CreateBoardDialog />
      <Image src="/laziness.png" alt="No links yet" width={400} height={400} />
    </div>
  );
};
