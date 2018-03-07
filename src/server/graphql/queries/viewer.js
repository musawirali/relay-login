/* @flow */

import getViewerType from '../types/viewer';
import { getSessionUser } from '../../session';

/**
 * This query is used to fetch the 'viewer', i.e. the
 * object that contains the user who is currently logged in.
 */
export default {
  type: getViewerType(),
  resolve: (parent, args, req) => ({
    // Simply fetch the user set in the session.
    // This will return NULL if there is no logged in user.
    user: getSessionUser(req),
  }),
};
