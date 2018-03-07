import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { setSessionUser } from '../../session';
import getViewerType from '../types/viewer';

/**
 * Hard coded function to validate login credentials.
 * NOTE: This is just for demonstration purposes, obviously.
 */
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
    // Check login info.
    const user = checkLoginInfo(email, password);
    if (!user) {
      throw new Error('Invalid login info');
    }

    // Set the logged in user in the session.
    setSessionUser(req, user);

    // The output is the viewer field, which embeds the user.
    return { viewer: { user }};
  },
};

export default mutationWithClientMutationId(config);
