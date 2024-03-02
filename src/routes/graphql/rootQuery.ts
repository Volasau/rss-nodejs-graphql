import { GraphQLObjectType } from 'graphql';
import { userQueries } from './queries/userQueries.js';
import { profileQueries } from './queries/profileQueries.js';
import { memberTypeQueries } from './queries/memberQueries.js';
import { postQueries } from './queries/postQueries.js';

export const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: () => ({
    ...userQueries,
    ...profileQueries,
    ...postQueries,
    ...memberTypeQueries,
  }),
});
