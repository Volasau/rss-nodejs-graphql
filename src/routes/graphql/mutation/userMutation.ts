import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { UserType } from '../types/user.js';
import { ChangeUserInputType, CreateUserInputType } from './type/userInputs.js';
import { prismaClient } from '../prismaClient.js';
import { User } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';

interface Args {
  id: string;
  dto: Omit<User, 'id'>;
}

export const userMutation = {
  createUser: {
    type: UserType,
    args: { dto: { type: new GraphQLNonNull(CreateUserInputType) } },
    resolve: async (_obj, args: Args) =>
      await prismaClient.user.create({ data: args.dto }),
  },
  changeUser: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeUserInputType) },
    },
    resolve: async (_obj, args: Args) =>
      await prismaClient.user.update({ where: { id: args.id }, data: args.dto }),
  },
  deleteUser: {
    type: GraphQLBoolean,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_obj, args: User) => {
      try {
        await prismaClient.user.delete({ where: { id: args.id } });
      } catch (err) {
        return false;
      }
      return true;
    },
  },
};
