import express from 'express';
import session from 'express-session';
import graphqlHTTP from 'express-graphql';
import getSchema from './server/graphql';

/**
 * Create express instance.
 */
const app = express();

/**
 * Add (in-memory) session middleware.
 * NOTE: In-memory session store is not recommended, this is only for demonstration.
 */
app.use(session({
  name: 'mysession',
  secret: 'MYSECRET',
  resave: false,
  saveUninitialized: true,
}));

/**
 * Specify static assets directory.
 * We build the client JS into this directory.
 */
app.use(express.static('static'));

/**
 * Request handler to serve our web page.
 */
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

/**
 * Add GraphQL endpoint.
 * NOTE: The graphiql interface is enabled for debugging, but is not needed.
 */
app.use('/graphql', graphqlHTTP({ schema: getSchema(), graphiql: true }));

/**
 * Start the server.
 */
app.listen('4000', () => console.log('Server started: http://localhost:4000'));
