import { prismaClient } from '../prismaClient.js';
import { Profile } from '../type/types.js';
import { ProfileType, ProfilesType } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';

export const profileQueries = {
  profile: {
    type: ProfileType,
    args: { id: { type: UUIDType } },
    resolve: async (_obj, { id }: Profile) =>
      await prismaClient.profile.findFirst({ where: { id } }),
  },

  profiles: {
    type: ProfilesType,
    resolve: async () => await prismaClient.profile.findMany({}),
  },
};
