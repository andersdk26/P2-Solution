import { group } from 'console';
import { sql } from 'drizzle-orm';
import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const moviesTable = mysqlTable('movies', {
    id: int('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    genres: varchar('genres', { length: 255 }).notNull(),
});

export type InsertMovie = typeof moviesTable.$inferInsert;
export type SelectMovie = typeof moviesTable.$inferSelect;

export const usersTable = mysqlTable('users', {
    id: int('id').primaryKey(),
    username: varchar('username', { length: 30 }).notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    createdAt: timestamp('created_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    lastLogin: timestamp('last_login').default(sql`(CURRENT_TIMESTAMP)`),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

// *** SQLite ***
// import { integer, sqliteTable, text, blob } from 'drizzle-orm/sqlite-core';

// export const usersTable = sqliteTable('users', {
//     id: integer('id').primaryKey(),
//     username: text('username').notNull(),
//     email: text('email').unique().notNull(),
//     password: text('password').notNull(),
//     createdAt: text('created_at')
//         .default(sql`(CURRENT_TIMESTAMP)`)
//         .notNull(),
//     lastLogin: text('last_login').default(sql`(CURRENT_TIMESTAMP)`),
//     settings: text('settings').default(sql`'{}'`), // JSON stringified object
// });

// export type InsertUser = typeof usersTable.$inferInsert;
// export type SelectUser = typeof usersTable.$inferSelect;

// export const moviesTable = sqliteTable('movies', {
//     id: integer('id').primaryKey(),
//     title: text('title').notNull(),
//     genres: text('genres').notNull(),
// });

// export type InsertMovie = typeof moviesTable.$inferInsert;
// export type SelectMovie = typeof moviesTable.$inferSelect;

// export const movieLinkIdTable = sqliteTable('movie_link_id', {
//     id: integer('id').primaryKey(),
//     imdbId: integer('imdbId').notNull(),
//     tmdbId: integer('tmdbId').notNull(),
// });

// export type InsertMovieLinkId = typeof movieLinkIdTable.$inferInsert;
// export type SelectMovieLinkId = typeof movieLinkIdTable.$inferSelect;

// /* Skippers tables */
// // export const moviesTable = sqliteTable('movies', {
// //     id: integer('id').primaryKey(),
// //     InternalRating: integer('InternalRating').notNull(),
// //     InternalGenre: text('InternalGenre').notNull(),
// //     StreamingService: text('StreamingService').notNull(),
// //     Title: text('Title').notNull(),
// //     Releaseyear: integer('Releaseyear').notNull(),
// //     PersonalRating: integer('PersonalRating'),
// // });

// export const usersTable = sqliteTable('users', {
//     id: integer('id').primaryKey(),
//     username: text('username').notNull(),
//     email: text('email').unique().notNull(),
//     password: text('password').notNull(),
//     createdAt: text('created_at')
//         .default(sql`(CURRENT_TIMESTAMP)`)
//         .notNull(),
//     lastLogin: text('last_login').default(sql`(CURRENT_TIMESTAMP)`),
//     settings: text('settings').default(sql`'{}'`), // JSON stringified object
// });

// // Contains genre and their boost values
// export const genreBoostTable = sqliteTable('genre_boost', {
//     id: integer('id').primaryKey(),
//     genre: text('genre').notNull(),
//     boost: integer('boost').notNull(),
// });

// export const seenListTable = sqliteTable('seen_list', {
//     id: integer('id').primaryKey(), // The id we use
//     userId: integer('user_id')
//         .notNull()
//         .references(() => usersTable.id), // Who owns the seen list
// });

// export const seenListMoviesTable = sqliteTable('seen_list_movies', {
//     seenListId: integer('seen_list_id')
//         .notNull()
//         .references(() => seenListTable.id), // User
//     movieId: integer('movie_id')
//         .notNull()
//         .references(() => moviesTable.id), // Movies
// });

// export const seenListGenreBoostTable = sqliteTable('seen_list_genre_boost', {
//     seenListId: integer('seen_list_id')
//         .notNull()
//         .references(() => seenListTable.id), // User property
//     genreBoostId: integer('genre_boost_id')
//         .notNull()
//         .references(() => genreBoostTable.id), // genre and boost property
// });

// export const groupInfoTable = sqliteTable('group_info', {
//     groupId: integer('group_id').primaryKey(),
//     groupAdmin: text('group_admin')
//         .notNull()
//         .references(() => usersTable.id), // foreign key to users table
// });

// export const groupMembersTable = sqliteTable('group_members', {
//     id: integer('id').primaryKey(),
//     groupId: integer('group_id')
//         .notNull()
//         .references(() => groupInfoTable.groupId), // foreign key to group_info table
//     userId: integer('user_id')
//         .notNull()
//         .references(() => usersTable.id), // foreign key to users table
// });

// export const IMDBImageIdTable = sqliteTable('imdb_image_id', {
//     id: integer('id').primaryKey(),
//     imageId: integer('imageId').notNull(),
// });

// export type InsertIMDBImageId = typeof IMDBImageIdTable.$inferInsert;
// export type SelectIMDBImageId = typeof IMDBImageIdTable.$inferSelect;

// To update the schema, run: npx drizzle-kit push
// After deleting fts tables, run: CREATE VIRTUAL TABLE movies_fts USING fts5(id UNINDEXED, title, genres); INSERT INTO movies_fts (rowid, id, title, genres) SELECT id, id, title, genres FROM movies;
