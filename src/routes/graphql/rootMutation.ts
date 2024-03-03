import { GraphQLObjectType } from 'graphql';
import { userMutation } from './mutation/userMutation.js';
import { postMutation } from './mutation/postMutation.js';
import { profileMutation } from './mutation/profileMutation.js';
import { subscribeTo } from './mutation/subscribeToUser.js';
import { unsubscribeFrom } from './mutation/unsubscribeFromUser.js';

export const rootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  fields: () => ({
    ...userMutation,
    ...postMutation,
    ...profileMutation,
    ...subscribeTo,
    ...unsubscribeFrom,
  }),
});
