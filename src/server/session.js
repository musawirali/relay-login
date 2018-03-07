const users = {};

export const getSessionUser = (req) => users[req.session.user_id];
export const setSessionUser = (req, user) => {
  users[user.id] = user;
  req.session.user_id = user.id;
};
export const clearSessionUser = (req) => { req.session.user_id = null; };
