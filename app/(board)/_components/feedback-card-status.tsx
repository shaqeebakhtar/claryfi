import { cn, snakeCaseToString } from '@/lib/utils';
import React from 'react';

enum FeedbackStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

const FeedbackCardStatus = ({ status }: { status: string }) => {
  return (
    <div
      className={
        'flex items-center gap-2.5 text-xs font-medium w-max text-muted-foreground'
      }
    >
      <div
        className={cn(
          'relative inline-flex rounded-full h-2.5 w-2.5 aspect-square',
          status === FeedbackStatus.PENDING && 'bg-gray-400',
          status === FeedbackStatus.APPROVED && 'bg-emerald-400',
          status === FeedbackStatus.IN_PROGRESS && 'bg-violet-400',
          status === FeedbackStatus.DONE && 'bg-blue-400',
          status === FeedbackStatus.CANCELLED && 'bg-red-400'
        )}
      ></div>
      <span className="mt-0.5">{snakeCaseToString(status)}</span>
    </div>
  );
};

export default FeedbackCardStatus;
