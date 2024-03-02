import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';
import { MemberTypeId } from './memberId.js';
import { ProfilesType } from './profiles.js';
import { Member } from '../type/types.js';
import { prismaClient } from '../prismaClient.js';

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: ProfilesType,
      resolve: async ({ id }: Member) => {
        await prismaClient.profile.findMany({ where: { memberTypeId: id } });
      },
    },
  }),
});
