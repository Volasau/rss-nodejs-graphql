import { GraphQLNonNull } from 'graphql';
import { Profile } from '../type/types.js';
import { ProfileType } from '../types/profile.js';
import { ChangeProfileInputType, CreateProfileInputType } from './type/profileInputs.js';
import { prismaClient } from '../prismaClient.js';
import { UUIDType } from '../types/uuid.js';

interface IArgs {
  id: string;
  dto: Omit<Profile, 'id'> & Partial<Omit<Profile, 'id' | 'userId'>>;
}

export const profileMutation = {
  createProfile: {
    type: ProfileType,
    args: { dto: { type: new GraphQLNonNull(CreateProfileInputType) } },
    resolve: (_obj, args: IArgs) => prismaClient.profile.create({ data: args.dto }),
  },

  changeProfile: {
    type: ProfileType,
    args: {
      id: { type: UUIDType },
      dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
    },
    resolve: (_obj, args: IArgs) =>
      prismaClient.profile.update({ where: { id: args.id }, data: args.dto }),
  },

  deleteProfile: {
    type: new GraphQLNonNull(UUIDType),
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_obj, args: IArgs) => {
      await prismaClient.profile.delete({ where: { id: args.id } });
      return args.id;
    },
  },
};
