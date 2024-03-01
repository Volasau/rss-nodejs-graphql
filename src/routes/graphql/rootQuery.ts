import { GraphQLObjectType } from 'graphql';

export const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: () => ({}),
});
