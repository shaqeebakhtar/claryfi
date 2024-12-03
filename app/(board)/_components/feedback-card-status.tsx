import { cn, snakeCaseToString } from '@/lib/utils';
import {
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  CircleMinus,
} from 'lucide-react';
import React from 'react';

enum FeedbackStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

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

const FeedbackCardStatus = ({
  status,
  className,
}: {
  status: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 text-xs font-medium w-max text-muted-foreground',
        className
      )}
    >
      {statusIconMap[status as FeedbackStatus]}
      <span>{snakeCaseToString(status)}</span>
    </div>
  );
};

export default FeedbackCardStatus;
