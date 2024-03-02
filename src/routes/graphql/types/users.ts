import { GraphQLList } from 'graphql';
import { UserType } from './user.js';

export const UsersType = new GraphQLList(UserType);
