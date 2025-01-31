import { GraphQLNonNull } from 'graphql';
import { MemberType, MembersType } from '../types/member.js';
import { MemberTypeId } from '../types/memberId.js';
import { Member } from '../type/types.js';
import { prismaClient } from '../prismaClient.js';

export const memberTypeQueries = {
  memberType: {
    type: MemberType,
    args: {
      id: { type: new GraphQLNonNull(MemberTypeId) },
    },
    resolve: async (_obj, { id }: Member) =>
      await prismaClient.memberType.findFirst({ where: { id } }),
  },

  memberTypes: {
    type: MembersType,
    resolve: async () => await prismaClient.memberType.findMany(),
  },
};
