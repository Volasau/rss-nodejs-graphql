import { GraphQLNonNull } from 'graphql';
import { UserType } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';
import { prismaClient } from '../prismaClient.js';

interface IArgs {
  userId: string;
  authorId: string;
}

export const subscribeTo = {
  subscribeTo: {
    type: UserType,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },

    resolve: async (_obj, args: IArgs) => {
      await prismaClient.subscribersOnAuthors.create({
        data: { subscriberId: args.userId, authorId: args.authorId },
      });
      return await prismaClient.user.findFirst({ where: { id: args.userId } });
    },
  },
};
