import { TagOnPosts } from '@prisma/client';

export interface ITagOnPosts extends TagOnPosts {
  tag: {
    name: string;
    color: string;
  };
}
