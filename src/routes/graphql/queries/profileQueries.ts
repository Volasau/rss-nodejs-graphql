import { prismaClient } from '../prismaClient.js';
import { Profile } from '../type/types.js';
import { ProfileType } from '../types/profile.js';
import { ProfilesType } from '../types/profiles.js';
import { UUIDType } from '../types/uuid.js';

export const ProfileQueries = {
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
