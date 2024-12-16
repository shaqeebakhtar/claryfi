import { Comment, User } from '@prisma/client';

export interface IComment extends Comment {
  user: User;
}
