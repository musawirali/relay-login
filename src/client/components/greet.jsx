import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

const Greet = ({ user }) => {
  if (!user) {
    return (<div>Not logged in.</div>);
  }

  return (
    <div>
      Hi, {user.name}!
    </div>
  );
};

export default createFragmentContainer(
  Greet,
  {
    user: graphql`
      fragment greet_user on User {
        name
      }
    `,
  },
);
