import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { User } from '../type/types.js';
import { prismaClient } from '../prismaClient.js';
import { PostsType } from './post.js';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: async ({ id }: User) =>
        await prismaClient.profile.findFirst({ where: { userId: id } }),
    },

    posts: {
      type: PostsType,
      resolve: async ({ id }: User) =>
        await prismaClient.post.findMany({ where: { authorId: id } }),
    },

    userSubscribedTo: {
      type: UsersType,
      resolve: async ({ id }: User) => {
        const results = await prismaClient.subscribersOnAuthors.findMany({
          where: { subscriberId: id },
          select: { author: true },
        });

        return results.map((result) => result.author);
      },
    },

    subscribedToUser: {
      type: UsersType,
      resolve: async ({ id }: User) => {
        const results = await prismaClient.subscribersOnAuthors.findMany({
          where: { authorId: id },
          select: { subscriber: true },
        });
        return results.map((result) => result.subscriber);
      },
    },
  }),
});

export const UsersType = new GraphQLList(UserType);
