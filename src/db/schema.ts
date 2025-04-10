import { group } from 'console';
import { sql } from 'drizzle-orm';
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

export type InsertMovie = typeof moviesTable.$inferInsert;
export type SelectMovie = typeof moviesTable.$inferSelect;

export const movieLinkIdTable = sqliteTable('movie_link_id', {
    id: integer('id').primaryKey(),
    imdbId: integer('imdbId').notNull(),
    tmdbId: integer('tmdbId').notNull(),
});

export type InsertMovieLinkId = typeof movieLinkIdTable.$inferInsert;
export type SelectMovieLinkId = typeof movieLinkIdTable.$inferSelect;

export const testRatings = sqliteTable('testRatings', {
    id: integer('id').primaryKey(),
    userId: integer('userId').notNull(),
    movieId: integer('movieId').notNull(),
    movieRating: real('rating').notNull(),
    timestamp: integer('timestamp').notNull(),
});

// Skippers tables
export const moviesTable = sqliteTable('movies', {
    id: integer('id').primaryKey(),
    internalRating: integer('InternalRating'),
    internalGenre: text('genre').notNull(),
    streamingService: text('StreamingService'),
    title: text('title').notNull(),
    releaseyear: integer('Releaseyear'),
});
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

// Contains genre and their boost values
export const genreBoostTable = sqliteTable('genre_boost', {
    id: integer('id').primaryKey(),
    genre: text('genre').notNull(),
    boost: integer('boost').notNull(),
});

export const ratingsTable = sqliteTable('ratings', {
    id: integer('id').primaryKey(), // Primary key
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id), // Foreign key to usersTable
    movieId: integer('movie_id')
        .notNull()
        .references(() => moviesTable.id), // Foreign key to moviesTable
    personalRating: integer('personal_rating').notNull(), // User rating
});

export const ratingsGenreBoostTable = sqliteTable('ratings_genre_boost', {
    ratingsId: integer('ratings')
        .notNull()
        .references(() => ratingsTable.id), // User property
    genreBoostId: integer('genre_boost_id')
        .notNull()
        .references(() => genreBoostTable.id), // genre and boost property
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

// To update the schema, run: npx drizzle-kit push
// After deleting fts tables, run: CREATE VIRTUAL TABLE movies_fts USING fts5(id UNINDEXED, title, genres); INSERT INTO movies_fts (rowid, id, title, genres) SELECT id, id, title, genres FROM movies;

