import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';
import getUserType from './user';

let viewer = null;
export default () => {
  if (!viewer) {

    /**
     * GraphQL type 'Viewer'
     * This object contains the 'User' type representing
     * the currently logged in user.
     * It can be extended to include other info pertaining to the session.
     */
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
