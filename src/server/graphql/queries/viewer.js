/* @flow */

import getViewerType from '../types/viewer';
import { getSessionUser } from '../../session';

export default {
  type: getViewerType(),
  resolve: (parent, args, req) => ({
    user: getSessionUser(req),
  }),
};
