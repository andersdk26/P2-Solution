import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
    id: integer('id').primaryKey(),
    username: text('username').notNull(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    createdAt: text('created_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    lastLogin: text('last_login').default(sql`(CURRENT_TIMESTAMP)`),
    settings: text('settings').default(sql`'{}'`), // JSON stringified object
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const movieTable = sqliteTable('movies', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    content: text('genres').notNull(),
});

export type InsertPost = typeof movieTable.$inferInsert;
export type SelectPost = typeof movieTable.$inferSelect;

// to update the schema, run `npx drizzle-kit push`
