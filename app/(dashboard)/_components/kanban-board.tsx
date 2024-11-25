import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { FeedbackCard } from './dashboard-feedback-card';
import { Upvote } from '@prisma/client';
import { snakeCaseToString } from '@/lib/utils';
import {
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  CircleMinus,
} from 'lucide-react';

enum FeedbackStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

const columns = [
  FeedbackStatus.PENDING,
  FeedbackStatus.APPROVED,
  FeedbackStatus.IN_PROGRESS,
  FeedbackStatus.DONE,
  FeedbackStatus.CANCELLED,
];

type Feedback = {
  title: string;
  description: string;
  status: FeedbackStatus;
  upvotes: number;
  comments: number;
};

type FeedbackState = {
  [key in FeedbackStatus]: Feedback[];
};

const statusIconMap = {
  [FeedbackStatus.PENDING]: <CircleDashed className="size-5 text-gray-400" />,
  [FeedbackStatus.APPROVED]: (
    <CircleDotDashed className="size-5 text-emerald-400" />
  ),
  [FeedbackStatus.IN_PROGRESS]: (
    <CircleDot className="size-5 text-violet-400" />
  ),
  [FeedbackStatus.DONE]: <CircleCheck className="size-5 text-blue-400" />,
  [FeedbackStatus.CANCELLED]: <CircleMinus className="size-5 text-red-400" />,
};

export const KanbanBoard = ({ feedbacks }: { feedbacks: Feedback[] }) => {
  const [sortedFeedbacks, setSortedFeedbacks] = useState(() => {
    const tempFeedbacks: FeedbackState = {
      [FeedbackStatus.PENDING]: [],
      [FeedbackStatus.APPROVED]: [],
      [FeedbackStatus.IN_PROGRESS]: [],
      [FeedbackStatus.DONE]: [],
      [FeedbackStatus.CANCELLED]: [],
    };

    feedbacks.forEach((feedback) =>
      tempFeedbacks[feedback.status].push(feedback)
    );

    return tempFeedbacks;
  });

  return (
    <>
      <DragDropContext onDragEnd={() => {}}>
        <div className="flex gap-5 h-full px-3 lg:px-8 pb-3 lg:pb-8 mt-6 overflow-x-auto">
          {columns.map((column, index) => (
            <Droppable key={column} droppableId={`droppable-${column}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="relative flex-1 h-full border rounded bg-gray-50 min-w-[320px] p-3 pt-0 overflow-y-auto"
                >
                  <div className="flex items-center space-x-2 sticky bg-gray-50 top-0 z-10 pt-3 pb-2">
                    {statusIconMap[column]}
                    <span className="font-medium text-sm">
                      {snakeCaseToString(column)}
                    </span>
                    <span className="bg-white px-2.5 py-0.5 border rounded-full text-xs font-semibold">
                      {sortedFeedbacks[column].length}
                    </span>
                  </div>

                  {sortedFeedbacks[column].map((feedback, index) => (
                    <Draggable
                      draggableId={`draggable-${column}-${index}`}
                      index={index}
                      key={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <FeedbackCard feedback={feedback} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};
