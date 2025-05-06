import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

// // MySQL
// export default defineConfig({
//     schema: './src/db/schema.ts',
//     out: './migrations',
//     dialect: 'mysql',
//     dbCredentials: {
//         url: `mysql://${process.env.DATABASE_USER!}:${process.env.DATABASE_PASSWORD!}@${process.env.DATABASE_HOST!}/${process.env.DATABASE_NAME!}`,
//     },
// });

// SQLite
export default defineConfig({
    schema: './src/db/schema.ts',
    out: './migrations',
    dialect: 'turso',
    dbCredentials: {
        url: process.env.TURSO_CONNECTION_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
    },
});
