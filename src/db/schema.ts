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
//     key: text('k').notNull(),
//     value: text('v').notNull(),
// });

// export type InsertMoviesFtsConfigTable =
//     typeof moviesFtsConfigTable.$inferInsert;
// export type SelectMoviesFtsConfigTable =
//     typeof moviesFtsConfigTable.$inferSelect;

// export const moviesFtsContentTable = sqliteTable('movies_fts_content', {
//     id: integer('id').primaryKey(),
//     c0: integer('c0').notNull(),
//     c1: text('c1').notNull(),
//     c2: text('c2').notNull(),
// });

// export type InsertMovieFtsContent = typeof moviesFtsContentTable.$inferInsert;
// export type SelectMovieFtsContent = typeof moviesFtsContentTable.$inferSelect;

// export const moviesFtsDataTable = sqliteTable('movies_fts_data', {
//     id: integer('id').primaryKey(),
//     block: blob('block').notNull(),
// });

// export type InsertMovieFtsData = typeof moviesFtsDataTable.$inferInsert;
// export type SelectMovieFtsData = typeof moviesFtsDataTable.$inferSelect;

// export const moviesFtsDocsizeTable = sqliteTable('movies_fts_docsize', {
//     id: integer('id').primaryKey(),
//     size: blob('sz').notNull(),
// });

// export type InsertMovieFtsDocsize = typeof moviesFtsDocsizeTable.$inferInsert;
// export type SelectMovieFtsDocsize = typeof moviesFtsDocsizeTable.$inferSelect;

// export const moviesFtsIdxTable = sqliteTable('movies_fts_idx', {
//     segmentId: text('segid').notNull(),
//     term: text('term'),
//     pageNumber: text('pgno').notNull(),
// });

// export type InsertFtsIdxMovie = typeof moviesFtsIdxTable.$inferInsert;
// export type SelectFtsIdxMovie = typeof moviesFtsIdxTable.$inferSelect;

export const movieLinkIdTable = sqliteTable('movie_link_id', {
    id: integer('id').primaryKey(),
    imdbId: integer('imdbId').notNull(),
    tmdbId: integer('tmdbId').notNull(),
});

export type InsertMovieLinkId = typeof movieLinkIdTable.$inferInsert;
export type SelectMovieLinkId = typeof movieLinkIdTable.$inferSelect;

// to update the schema, run `npx drizzle-kit push`
