import React from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import createRelayEnv from '../util/relay';

import Greet from './greet';
import LoginForm from './login_form';
import Logout from './logout';

const env = createRelayEnv();

const App = ({ viewer, loading, error }) => {
  if (loading) {
    return (<div>Loading ...</div>);
  }

  if (error) {
    return (<div>Error: {error}</div>);
  }

  return (
    <div>
      <Greet user={viewer.user} />

      <div>
        { !viewer.user &&
          <LoginForm environment={env} />
        }
        { viewer.user &&
          <Logout environment={env} />
        }
      </div>
    </div>
  );
};

const query = graphql`
  query appViewerQuery {
    viewer {
      id
      user {
        ...greet_user
      }
    }
  }
`;

export default () => (
  <QueryRenderer
    environment={env}
    query={query}
    render={(data) => {
      const { error, props } = data;
      let errorMsg = null;
      let viewer = null;

      // Check loading
      const loading = !error && !props;

      // Check error
      if (!loading) {
        if (error) {
          errorMsg = error.message;
        }
        viewer = (props && props.viewer) || null;
        if (!viewer && !errorMsg) {
          errorMsg = 'Something went wrong. Try again.';
        }
      }

      // Render app
      return (
        <App
          viewer={viewer}
          loading={loading}
          error={errorMsg}
        />
      );
    }}
  />
);
