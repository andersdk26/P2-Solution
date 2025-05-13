// MySQL
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

config({ path: '.env' });

const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

export const db = drizzle(connection, { schema, mode: 'default' });

// //SQLite
// import { config } from 'dotenv';
// import { drizzle } from 'drizzle-orm/libsql';
// import { createClient } from '@libsql/client';
// import * as schema from './schema';

// config({ path: '.env' }); // or .env.local

// const client = createClient({
//     url: process.env.TURSO_CONNECTION_URL!,
//     authToken: process.env.TURSO_AUTH_TOKEN!,
// });

// export const db = drizzle(client, { schema });
