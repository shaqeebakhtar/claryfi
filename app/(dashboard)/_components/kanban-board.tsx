import { snakeCaseToString } from '@/lib/utils';
import { getFeedbacks } from '@/services/admin/feedback';
import { FeedbackStatus, IFeedback } from '@/types/feedback';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useQuery } from '@tanstack/react-query';
import {
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  CircleMinus,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FeedbackCard, FeedbackCardSkeleton } from './dashboard-feedback-card';
import { Skeleton } from '@/components/ui/skeleton';

const columns = [
  FeedbackStatus.PENDING,
  FeedbackStatus.APPROVED,
  FeedbackStatus.IN_PROGRESS,
  FeedbackStatus.DONE,
  FeedbackStatus.CANCELLED,
];

type FeedbackState = {
  [key in FeedbackStatus]: IFeedback[];
};

const statusIconMap = {
  [FeedbackStatus.PENDING]: <CircleDashed className="size-4 text-gray-400" />,
  [FeedbackStatus.APPROVED]: (
    <CircleDotDashed className="size-4 text-emerald-400" />
  ),
  [FeedbackStatus.IN_PROGRESS]: (
    <CircleDot className="size-4 text-violet-400" />
  ),
  [FeedbackStatus.DONE]: <CircleCheck className="size-4 text-blue-400" />,
  [FeedbackStatus.CANCELLED]: <CircleMinus className="size-4 text-red-400" />,
};

export const KanbanBoard = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: feedbacks, isLoading } = useQuery({
    queryKey: [slug, 'feedbacks'],
    queryFn: () => getFeedbacks({ slug }),
  });

  const [sortedFeedbacks, setSortedFeedbacks] = useState<FeedbackState>();

  useEffect(() => {
    if (!isLoading && feedbacks) {
      setSortedFeedbacks(() => {
        const tempFeedbacks: FeedbackState = {
          [FeedbackStatus.PENDING]: [],
          [FeedbackStatus.APPROVED]: [],
          [FeedbackStatus.IN_PROGRESS]: [],
          [FeedbackStatus.DONE]: [],
          [FeedbackStatus.CANCELLED]: [],
        };

        feedbacks?.forEach((feedback) =>
          tempFeedbacks[feedback.status].push(feedback)
        );

        return tempFeedbacks;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, feedbacks]);

  return (
    <>
      <DragDropContext onDragEnd={() => {}}>
        <div className="flex gap-5 h-full px-3 lg:px-8 pb-3 lg:pb-8 mt-6 overflow-x-auto">
          {columns.map((column) => (
            <Droppable key={column} droppableId={`droppable-${column}`}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="relative flex-1 h-full rounded-md bg-gray-50 min-w-[320px] p-3 pt-0 overflow-y-auto"
                >
                  <div className="flex items-center space-x-2 sticky bg-gray-50 top-0 z-10 pt-3 pb-2">
                    {statusIconMap[column]}
                    <span className="font-medium text-sm">
                      {snakeCaseToString(column)}
                    </span>
                    {isLoading ? (
                      <Skeleton className="w-7 h-5 rounded-full" />
                    ) : (
                      <span className="bg-white px-2.5 py-0.5 border rounded-full text-xs font-semibold">
                        {sortedFeedbacks && sortedFeedbacks[column].length}
                      </span>
                    )}
                  </div>
                  {isLoading
                    ? [...Array(3)].map((_, index) => (
                        <FeedbackCardSkeleton key={index} />
                      ))
                    : sortedFeedbacks &&
                      sortedFeedbacks[column].map((feedback, index) => (
                        <Draggable
                          draggableId={`draggable-${column}-${feedback.id}`}
                          index={index}
                          key={feedback.id}
                        >
                          {(provided) => (
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
