import { GraphQLNonNull } from 'graphql';
import { Profile } from '../type/types.js';
import { ProfileType } from '../types/profile.js';
import { ChangeProfileInputType, CreateProfileInputType } from './type/profileInputs.js';
import { prismaClient } from '../prismaClient.js';
import { UUIDType } from '../types/uuid.js';

interface Args {
  id: string;
  dto: Omit<Profile, 'id'>;
}

export const profileMutation = {
  createProfile: {
    type: ProfileType,
    args: { dto: { type: new GraphQLNonNull(CreateProfileInputType) } },
    resolve: (_obj, args: Args) => prismaClient.profile.create({ data: args.dto }),
  },

  changeProfile: {
    type: ProfileType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
    },
    resolve: (_obj, args: Args) =>
      prismaClient.profile.update({ where: { id: args.id }, data: args.dto }),
  },

  deleteProfile: {
    type: new GraphQLNonNull(UUIDType),
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_obj, args: Args) => {
      const profile = await prismaClient.profile.delete({ where: { id: args.id } });
      return profile.id;
    },
  },
};
