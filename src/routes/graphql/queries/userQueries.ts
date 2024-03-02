import { prismaClient } from '../prismaClient.js';
import { User } from '../type/types.js';
import { UserType } from '../types/user.js';
import { UsersType } from '../types/users.js';
import { UUIDType } from '../types/uuid.js';

export const userQueries = {
  user: {
    type: UserType,
    args: { id: { type: UUIDType } },
    resolve: async (_obj, { id }: User) =>
      await prismaClient.user.findFirst({ where: { id } }),
  },

  users: {
    type: UsersType,
    resolve: async () => await prismaClient.user.findMany(),
  },
};
