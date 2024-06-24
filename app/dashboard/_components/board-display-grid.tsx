'use client';

import React from 'react';
import BoardCard, { BoardCardSkeleton } from './board-card';
import { useQuery } from '@tanstack/react-query';
import { getBoards } from '@/data-access/board';
import { type Board } from '@prisma/client';

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
    return <h1>No boards</h1>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {boards.map((board: Board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
};

export default BoardDisplayGrid;
