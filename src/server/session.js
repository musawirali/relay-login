/**
 * This is a simple implementation of an in-memory store for mapping a user ID
 * that is stored in the session into an object that contains the user data (i.e. user model).
 * NOTE: This is for demonstration purposes, obviously. Normally you'd query a
 * database, cache, etc. to accomplish this.
 */

// Map: user ID => user object
const users = {};

/**
 * Query store with user ID in session (i.e. check for logged in user)
 */
export const getSessionUser = (req) => users[req.session.user_id];

/**
 * Set user object in store and set user ID in session (i.e. when user logs in)
 */
export const setSessionUser = (req, user) => {
  users[user.id] = user;
  req.session.user_id = user.id;
};

/**
 * Clear session (i.e. when user logs out)
 */
export const clearSessionUser = (req) => {
  delete users[req.session.user_id];
  req.session.user_id = null;
};
