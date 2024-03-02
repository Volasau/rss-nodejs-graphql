import { GraphQLObjectType } from 'graphql';

export const rootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  fields: () => ({}),
});
