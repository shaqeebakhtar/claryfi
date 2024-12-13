import { Feedback } from '@prisma/client';
import { ITagOnPosts } from './tag';

export enum FeedbackStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export interface IFeedback extends Feedback {
  _count: {
    upvotes: number;
    comments: number;
  };
  tags: ITagOnPosts[];
}
