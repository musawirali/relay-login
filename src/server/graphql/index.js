import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import viewer from './queries/viewer';
import login from './mutations/login';
import logout from './mutations/logout';

// Queries
const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    //node,
    viewer,
  }),
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login,
    logout,
  },
});

// Schema
let schema = null;
export default () => {
  if (!schema) {
    schema = new GraphQLSchema({
      query,
      mutation,
    });
  }

  return schema;
};
