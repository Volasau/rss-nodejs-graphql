import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, graphSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query: source, variables: variableValues } = req.body;
      const AST = parse(source);
      const validationRules = validate(graphSchema, AST, [depthLimit(5)]);

      if (validationRules.length > 0) {
        return { errors: validationRules };
      }

      const { data, errors } = await graphql({
        source,
        variableValues,
        schema: graphSchema,
      });

      return { data, errors };
    },
  });
};

export default plugin;
