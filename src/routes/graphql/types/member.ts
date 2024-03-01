import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';
import { MemberTypeId } from './memberId.js';

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});
