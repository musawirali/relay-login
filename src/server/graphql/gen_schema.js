/**
 * This is a simple script that is used to dump the GraphQL schema
 * constructed in JS into a file in GraphQL syntax. The file is used
 * by the Relay compiler.
 */

import fs from 'fs';
import { printSchema } from 'graphql/utilities';
import getSchema from './';

// Create GraphQL schema
const schema = getSchema();
// Dump to file
fs.writeFileSync('./lib/server/graphql/schema.graphql', printSchema(schema));
