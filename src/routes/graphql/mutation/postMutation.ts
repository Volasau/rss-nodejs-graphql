import { GraphQLNonNull } from 'graphql';
import { Post } from '../type/types.js';
import { PostType } from '../types/post.js';
import { ChangePostInputType, CreatePostInputType } from './type/postInputs.js';
import { prismaClient } from '../prismaClient.js';
import { UUIDType } from '../types/uuid.js';

interface IArgs {
  id: string;
  dto: Omit<Post, 'id'>;
}

export const postMutation = {
  createPost: {
    type: PostType,
    args: { dto: { type: new GraphQLNonNull(CreatePostInputType) } },
    resolve: async (_obj, args: IArgs) =>
      await prismaClient.post.create({ data: args.dto }),
  },

  changePost: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangePostInputType) },
    },
    resolve: async (_obj, args: IArgs) =>
      await prismaClient.post.update({ where: { id: args.id }, data: args.dto }),
  },

  deletePost: {
    type: new GraphQLNonNull(UUIDType),
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_obj, args: IArgs) => {
      await prismaClient.post.delete({ where: { id: args.id } });
      return args.id;
    },
  },
};
