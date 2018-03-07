import { Environment, Network, RecordSource, Store } from 'relay-runtime';


// Store
const store = new Store(new RecordSource());

// Network
const network = Network.create((operation, variables) => {
  const query = operation.text;
  return fetch('/graphql', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then(resp => resp.json()
    .then((json) => {
      const { data } = json;
      const error = (json.errors || [])[0];
      if (error) {
        return Promise.reject(new Error(error.message));
      }

      return { data };
    }));
});

// Environment
export default () => new Environment({
  network,
  store,
});
