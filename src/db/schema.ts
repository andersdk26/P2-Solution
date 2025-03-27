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

export const moviesTable = sqliteTable('movies', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    genres: text('genres').notNull(),
});

export type InsertMovie = typeof moviesTable.$inferInsert;
export type SelectMovie = typeof moviesTable.$inferSelect;

// export const moviesFtsTable = sqliteTable('movies_fts', {
//     id: integer('id').primaryKey(),
//     title: text('title').notNull(),
//     genres: text('genres').notNull(),
//     moviesFts: integer('movies_fts').notNull(),
//     rank: integer('rank'),
// });

// export type InsertMoviesFts = typeof moviesFtsTable.$inferInsert;
// export type SelectMoviesFts = typeof moviesFtsTable.$inferSelect;

// export const moviesFtsConfigTable = sqliteTable('movies_fts_config', {
//     key: integer('k').primaryKey(),
//     value: integer('v'),
// });

// export type InsertMoviesFtsConfigTable =
//     typeof moviesFtsConfigTable.$inferInsert;
// export type SelectMoviesFtsConfigTable =
//     typeof moviesFtsConfigTable.$inferSelect;

// export const moviesTable = sqliteTable('movies', {
//     id: integer('id').primaryKey(),
//     title: text('title').notNull(),
//     genres: text('genres').notNull(),
// });

// export type InsertMovie = typeof moviesTable.$inferInsert;
// export type SelectMovie = typeof moviesTable.$inferSelect;

// export const moviesTable = sqliteTable('movies', {
//     id: integer('id').primaryKey(),
//     title: text('title').notNull(),
//     genres: text('genres').notNull(),
// });

// export type InsertMovie = typeof moviesTable.$inferInsert;
// export type SelectMovie = typeof moviesTable.$inferSelect;

// export const moviesTable = sqliteTable('movies', {
//     id: integer('id').primaryKey(),
//     title: text('title').notNull(),
//     genres: text('genres').notNull(),
// });

// export type InsertMovie = typeof moviesTable.$inferInsert;
// export type SelectMovie = typeof moviesTable.$inferSelect;

// export const moviesTable = sqliteTable('movies', {
//     id: integer('id').primaryKey(),
//     title: text('title').notNull(),
//     genres: text('genres').notNull(),
// });

// export type InsertMovie = typeof moviesTable.$inferInsert;
// export type SelectMovie = typeof moviesTable.$inferSelect;

export const movieLinkIdTable = sqliteTable('movie_link_id', {
    id: integer('id').primaryKey(),
    imdbId: integer('imdbId').notNull(),
    tmdbId: integer('tmdbId').notNull(),
});

export type InsertMovieLinkId = typeof movieLinkIdTable.$inferInsert;
export type SelectMovieLinkId = typeof movieLinkIdTable.$inferSelect;

// to update the schema, run `npx drizzle-kit push`
