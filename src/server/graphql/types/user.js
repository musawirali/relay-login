import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

let user = null;
export default () => {
  if (!user) {
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
