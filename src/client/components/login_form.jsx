import React from 'react';
import { commitMutation } from 'react-relay';

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      submitting: false,
      error: null,
    };
  }

  doLogin(evt) {
    evt.preventDefault();

    this.setState({
      submitting: true,
      error: null,
    }, () => {

      commitMutation(this.props.environment, {
        mutation: graphql`
          mutation loginFormLoginMutation($input: LoginInput!) {
            login(input: $input) {
              viewer {
                id
                user {
                  ...greet_user
                }
              }
            }
          }
        `,
        variables: {
          input: {
            email: this.state.email,
            password: this.state.password,
          },
        },
        onError: (err) => this.setState({ submitting: false, error: err.message }),
      });

    });
  };

  render() {
    const { email, password, submitting, error } = this.state;

    return (
      <form onSubmit={evt => this.doLogin(evt)}>
        <div>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={evt => this.setState({ email: evt.target.value })}
            disabled={submitting}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={evt => this.setState({ password: evt.target.value })}
            disabled={submitting}
          />
        </div>
        <div>
          <input type="submit" disabled={submitting} />
        </div>
        { error &&
          <div>
            {error}
          </div>
        }
      </form>
    );
  }
}

export default LoginForm;
