import { Comment, CommentLike, User } from '@prisma/client';

export interface IComment extends Comment {
  user: User;
  commentLikes: CommentLike[];
}
