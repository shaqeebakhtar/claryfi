import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { FeedbackCard } from './dashboard-feedback-card';
import { Feedback, Upvote } from '@prisma/client';

enum FeedbackStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
  CANCELLED = 'Cancelled',
}

const columns = [
  FeedbackStatus.PENDING,
  FeedbackStatus.APPROVED,
  FeedbackStatus.IN_PROGRESS,
  FeedbackStatus.DONE,
  FeedbackStatus.CANCELLED,
];

export const KanbanBoard = () => {
  return (
    <>
      <DragDropContext onDragEnd={() => {}}>
        <div className="flex gap-5 h-full px-3 lg:px-8 pb-3 lg:pb-8 mt-5 overflow-x-auto">
          {columns.map((column) => (
            <div
              key={column}
              className="relative flex-1 h-full border rounded bg-gray-50 min-w-[320px] p-3 pt-0 overflow-y-auto"
            >
              <div className="space-x-2 sticky bg-gray-50 top-0 z-10 pt-3 pb-2">
                <span className="font-medium text-sm">{column}</span>
                <span className="bg-white px-2.5 py-0.5 border rounded-full text-xs font-semibold">
                  3
                </span>
              </div>

              <FeedbackCard />
              <FeedbackCard />
              <FeedbackCard />
              <FeedbackCard />
            </div>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};
