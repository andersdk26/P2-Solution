import { group } from 'console';
import { sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/gel-core';
import {
    integer,
    sqliteTable,
    text,
    blob,
    real,
} from 'drizzle-orm/sqlite-core';
/*
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
*/

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const moviesTable = sqliteTable('movies', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    genres: text('genres').notNull(),
});

export type InsertMovie = typeof moviesTable.$inferInsert;
export type SelectMovie = typeof moviesTable.$inferSelect;

export const friendsTable = sqliteTable('friends', {
    id: integer('id').primaryKey(),
    userIdA: integer('userIdA').notNull(),
    userIdB: integer('userIdB').notNull(),
    status: integer('status').notNull(),
});

export type InserFriend = typeof friendsTable.$inferInsert;
export type SelectFriend = typeof friendsTable.$inferSelect;

export const groupsTable = sqliteTable('groups', {
    groupId: integer('groupId').primaryKey(),
    groupName: text('groupName').notNull(),
    adminId: integer('adminId').notNull(),
    members: text('members').notNull(),
    settings: text('settings').notNull(),
});

export type InsertGroup = typeof groupsTable.$inferInsert;
export type SelectGroup = typeof groupsTable.$inferSelect;

export const groupRequestsTable = sqliteTable('groupRequests', {
    id: integer('id').primaryKey(),
    userId: integer('userId').notNull(),
    groupId: integer('groupId').notNull(),
});

export type InsertGroupRequestsTable = typeof groupRequestsTable.$inferInsert;
export type SelectGroupRequestsTable = typeof groupRequestsTable.$inferSelect;

export const movieLinkIdTable = sqliteTable('movie_link_id', {
    id: integer('id').primaryKey(),
    imdbId: integer('imdbId').notNull(),
    tmdbId: integer('tmdbId').notNull(),
});

export type InsertMovieLinkId = typeof movieLinkIdTable.$inferInsert;
export type SelectMovieLinkId = typeof movieLinkIdTable.$inferSelect;

export const watchlistTable = sqliteTable('watchlist', {
    id: integer('id').primaryKey(),
    movieId: integer('movieId')
        .notNull()
        .references(() => moviesTable.id),
    userId: integer('userId')
        .notNull()
        .references(() => usersTable.id),
});

export type InsertWatchlist = typeof watchlistTable.$inferInsert;
export type SelectWatchlist = typeof watchlistTable.$inferSelect;

export const testRatings = sqliteTable('testRatings', {
    id: integer('id').primaryKey(),
    userId: integer('userId').notNull(),
    movieId: integer('movieId').notNull(),
    rating: integer('rating').notNull(),
    timestamp: integer('timestamp').notNull(),
});

// export const testRatings = sqliteTable(
//     'testRatings',
//     {
//         id: integer('id').primaryKey(),
//         userId: integer('userId').notNull(),
//         movieId: integer('movieId').notNull(),
//         rating: integer('rating').notNull(),
//         timestamp: text('timestamp')
//             .default(sql`(CURRENT_TIMESTAMP)`)
//             .notNull(),
//     },
//     (table) => ({
//         uniqueUserMovie: unique().on(table.userId, table.movieId), // Add UNIQUE constraint
//     })
// );

export type InsertTestRatings = typeof testRatings.$inferInsert;
export type SelectTestRatings = typeof testRatings.$inferSelect;

/* Skippers tables */
// export const moviesTable = sqliteTable('movies', {
//     id: integer('id').primaryKey(),
//     InternalRating: integer('InternalRating').notNull(),
//     InternalGenre: text('InternalGenre').notNull(),
//     StreamingService: text('StreamingService').notNull(),
//     Title: text('Title').notNull(),
//     Releaseyear: integer('Releaseyear').notNull(),
//     PersonalRating: integer('PersonalRating'),
// });

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
    profileIcon: text('profile_icon'),
});

export const groupInfoTable = sqliteTable('group_info', {
    groupId: integer('group_id').primaryKey(),
    groupAdmin: text('group_admin')
        .notNull()
        .references(() => usersTable.id), // foreign key to users table
});

export const groupMembersTable = sqliteTable('group_members', {
    id: integer('id').primaryKey(),
    groupId: integer('group_id')
        .notNull()
        .references(() => groupInfoTable.groupId), // foreign key to group_info table
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id), // foreign key to users table
});

export const IMDBImageIdTable = sqliteTable('imdb_image_id', {
    id: integer('id').primaryKey(),
    imageId: integer('imageId').notNull(),
});

export type InsertIMDBImageId = typeof IMDBImageIdTable.$inferInsert;
export type SelectIMDBImageId = typeof IMDBImageIdTable.$inferSelect;

export const movieImageCacheTable = sqliteTable('movie_image_cache', {
    id: integer('id').primaryKey(), // auto increment
    movieId: integer('movieId')
        .notNull()
        .references(() => moviesTable.id),
    url: text('url').notNull(),
    blurHash: text('blurHash'),
    timestamp: text('timestamp')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
});

export type InsertmovieImageCache = typeof movieImageCacheTable.$inferInsert;
export type SelectmovieImageCache = typeof movieImageCacheTable.$inferSelect;

// To update the schema, run: npx drizzle-kit push
// After deleting fts tables, run: CREATE VIRTUAL TABLE movies_fts USING fts5(id UNINDEXED, title, genres); INSERT INTO movies_fts (rowid, id, title, genres) SELECT id, id, title, genres FROM movies;
