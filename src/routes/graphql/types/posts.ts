import { GraphQLList } from 'graphql';
import { PostType } from './post.js';

export const PostsType = new GraphQLList(PostType);
