import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';
import getUserType from './user';

let viewer = null;
export default () => {
  if (!viewer) {
    viewer = new GraphQLObjectType({
      name: 'Viewer',
      description: 'Authenticated user',
      fields: () => ({
        id: {
          type: new GraphQLNonNull(GraphQLID),
          resolve: () => 'VIEWER', // Fixed ID for this type
        },
        user: {
          type: getUserType(),
        },
      }),
    });
  }

  return viewer;
};
