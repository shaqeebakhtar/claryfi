import { Comment, Feedback, Upvote, User } from '@prisma/client';
import { ITagOnPosts } from './tag';
import { IComment } from './comment';

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
  user: User;
  upvotes: Upvote[];
  tags: ITagOnPosts[];
  comments: IComment[];
}
