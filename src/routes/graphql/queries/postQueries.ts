import { GraphQLNonNull } from 'graphql';
import { PostType } from '../types/post.js';
import { UUIDType } from '../types/uuid.js';
import { Post } from '../type/types.js';
import { prismaClient } from '../prismaClient.js';
import { PostsType } from '../types/posts.js';

export const postQueries = {
  post: {
    type: PostType,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_obj, { id }: Post) =>
      await prismaClient.post.findFirst({ where: { id } }),
  },

  posts: {
    type: PostsType,
    resolve: async () => await prismaClient.post.findMany(),
  },
};
