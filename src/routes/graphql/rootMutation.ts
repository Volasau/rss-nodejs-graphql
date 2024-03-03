import { GraphQLObjectType } from 'graphql';
import { userMutation } from './mutation/userMutation.js';
import { postMutation } from './mutation/postMutation.js';
import { profileMutation } from './mutation/profileMutation.js';

export const rootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  fields: () => ({
    ...userMutation,
    ...postMutation,
    ...profileMutation,
  }),
});
