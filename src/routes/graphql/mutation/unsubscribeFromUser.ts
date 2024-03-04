import { GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { prismaClient } from '../prismaClient.js';

interface IArgs {
  userId: string;
  authorId: string;
}

export const unsubscribeFrom = {
  unsubscribeFrom: {
    type: new GraphQLNonNull(UUIDType),
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },

    resolve: async (_obj, args: IArgs) => {
      await prismaClient.subscribersOnAuthors.deleteMany({
        where: { subscriberId: args.userId, authorId: args.authorId },
      });

      return args.authorId;
    },
  },
};
