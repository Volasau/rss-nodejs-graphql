import { GraphQLList } from 'graphql';
import { ProfileType } from './profile.js';

export const ProfilesType = new GraphQLList(ProfileType);
