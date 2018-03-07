import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { setSessionUser } from '../../session';
import getViewerType from '../types/viewer';

// Check login info
const checkLoginInfo = (email, password) => {
  if (password === 'abc') {
    return { id: 222, name: 'Joe Foo'};
  };
  return false;
};

/**
 * This mutation checks login info (email and password) and then
 * sets the corresponding user to the session. The viewer object is
 * returned.
 */
const config = {
  name: 'Login',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: () => ({
    viewer: {
      type: getViewerType(),
      resolve: ({ viewer }) => viewer,
    },
  }),
  mutateAndGetPayload: ({ email, password }, req) => {
    const user = checkLoginInfo(email, password);
    if (!user) {
      throw new Error('Invalid login info');
    }

    setSessionUser(req, user);
    return { viewer: { user }};
  },
};

export default mutationWithClientMutationId(config);
