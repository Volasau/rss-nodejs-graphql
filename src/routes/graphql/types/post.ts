import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import { Post } from '../type/types.js';
import { prismaClient } from '../prismaClient.js';

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
    author: {
      type: UserType,
      resolve: async ({ authorId }: Post) =>
        await prismaClient.user.findFirst({ where: { id: authorId } }),
    },
  }),
});

export const PostsType = new GraphQLList(PostType);
