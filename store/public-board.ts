import { Board, Feedback } from '@prisma/client';
import { create } from 'zustand';

interface TBoard extends Board {
  feedbacks: Feedback[];
}

type PublicBoardStore = {
  board: TBoard | null;
  setBoard: (board: TBoard) => void;

  boardName: string;
  setBoardName: (name: string) => void;

  feedbacks: Feedback[];
  setFeedbacks: (feedbacks: Feedback[]) => void;
};

export const usePublicBoardStore = create<PublicBoardStore>()((set) => ({
  board: null,
  setBoard: (board: TBoard) =>
    set(() => ({
      board,
    })),

  boardName: '',
  setBoardName: (name: string) =>
    set(() => ({
      boardName: name,
    })),
  feedbacks: [],

  setFeedbacks: (feedbacks: Feedback[]) =>
    set(() => ({
      feedbacks,
    })),
}));
