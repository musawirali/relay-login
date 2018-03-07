import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { clearSessionUser } from '../../session';
import getViewerType from '../types/viewer';

/**
 * This mutation clears the session and logs the user out.
 */
const config = {
  name: 'Logout',
  inputFields: {},
  outputFields: () => ({
    viewer: {
      type: getViewerType(),
      resolve: ({ viewer }) => viewer,
    },
  }),
  mutateAndGetPayload: (args, req) => {
    clearSessionUser(req);
    return { viewer: { user: null }};
  },
};

export default mutationWithClientMutationId(config);
