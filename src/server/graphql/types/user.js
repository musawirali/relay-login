import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

let user = null;
export default () => {
  if (!user) {

    /**
     * GraphQL type 'User'
     * We just have the `id` and `name` fields for this example.
     */
    user = new GraphQLObjectType({
      name: 'User',
      description: 'User details',
      fields: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
        name: {
          type: GraphQLString,
        },
      },
    });
  }

  return user;
};
