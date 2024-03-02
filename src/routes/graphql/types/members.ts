import { GraphQLList } from 'graphql';
import { MemberType } from './member.js';

export const MembersType = new GraphQLList(MemberType);
