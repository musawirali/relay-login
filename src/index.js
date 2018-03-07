import express from 'express';
import session from 'express-session';
import graphqlHTTP from 'express-graphql';

import getSchema from './server/graphql';

// Create GraphQL schema
const schema = getSchema();

// Create the express app
const app = express();

// Add (in-memory) session middleware
app.use(session({
  name: 'mysession',
  secret: 'MYSECRET',
  resave: false,
  saveUninitialized: true,
}));

// Serve static assets (we build the client JS into this directory)
app.use(express.static('static'));

// GET root request handler
app.get('/', (req, resp) => {
  // We'll send this static HTML that simply loads the client-side JS.
  const html = `
    <html>
      <body>
        <div id="app">
          Loading ...
        <div>

        <script type="text/javascript" src="/client.js"></script>
      </body>
    </html>
  `;

  resp.send(html);
});

// GraphQL end point
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen('4000', () => console.log('Server started: http://localhost:4000'));
