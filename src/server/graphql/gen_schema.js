import fs from 'fs';
import { printSchema } from 'graphql/utilities';
import getSchema from './';

// Create GraphQL schema
const schema = getSchema();
fs.writeFileSync('./lib/server/graphql/schema.graphql', printSchema(schema));
