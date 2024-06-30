import { cn } from '@/lib/utils';
import React from 'react';

type FeedbackStatusProps = {
  status: string;
};

enum Status {
  NEW = 'NEW',
  CANCELLED = 'CANCELLED',
  IN_PROGRESS = 'IN_PROGRESS',
  LIVE = 'LIVE',
}

const FeedbackStatus = ({ status }: FeedbackStatusProps) => {
  return (
    <div
      className={cn(
        'text-xs font-semibold w-max px-2.5 py-0.5 rounded-full',
        status === Status.NEW && 'bg-muted text-muted-foreground',
        status === Status.CANCELLED && 'bg-destructive/10 text-destructive',
        status === Status.IN_PROGRESS && 'bg-purple-600/10 text-purple-600',
        status === Status.LIVE && 'bg-blue-400/10 text-blue-400'
      )}
    >
      <span>{status.replace('_', ' ')}</span>
    </div>
  );
};

export default FeedbackStatus;
