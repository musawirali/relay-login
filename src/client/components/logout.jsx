import React from 'react';
import { commitMutation } from 'react-relay';

class Logout extends React.Component {
  constructor() {
    super();

    this.state = {
      submitting: false,
      error: null,
    };
  }

  doLogout() {
    this.setState({
      submitting: true,
      error: null,
    }, () => {

      commitMutation(this.props.environment, {
        mutation: graphql`
          mutation logoutMutation($input: LogoutInput!) {
            logout(input: $input) {
              viewer {
                id
                user {
                  ...greet_user
                }
              }
            }
          }
        `,
        variables: { input: {} },
        onError: (err) => this.setState({ submitting: false, error: err.message }),
      });

    });
  };

  render() {
    const { submitting, error } = this.state;

    return (
      <div>
        <button onClick={() => this.doLogout()} disabled={submitting}>
          Log out
        </button>
        { error &&
          <div>
            {error}
          </div>
        }
      </div>
    );
  }
}

export default Logout;
