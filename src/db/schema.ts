import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, blob } from 'drizzle-orm/sqlite-core';

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

export const moviesTable = sqliteTable('movies', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    genres: text('genres').notNull(),
});

export type InsertMovie = typeof moviesTable.$inferInsert;
export type SelectMovie = typeof moviesTable.$inferSelect;

export const movieLinkIdTable = sqliteTable('movie_link_id', {
    id: integer('id').primaryKey(),
    imdbId: integer('imdbId').notNull(),
    tmdbId: integer('tmdbId').notNull(),
});

export type InsertMovieLinkId = typeof movieLinkIdTable.$inferInsert;
export type SelectMovieLinkId = typeof movieLinkIdTable.$inferSelect;

// to update the schema, run `npx drizzle-kit push`
