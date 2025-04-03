import { group } from 'console';
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

export const movieTables = sqliteTable('movies', {
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

/* Skippers tables */
export const moviesTable = sqliteTable('movies', {
    id: integer('id').primaryKey(),
    InternalRating: integer('InternalRating').notNull(),
    InternalGenre: text('InternalGenre').notNull(),
    StreamingService: text('StreamingService').notNull(),
    Title: text('Title').notNull(),
    Releaseyear: integer('Releaseyear').notNull(),
    PersonalRating: integer('PersonalRating'), // optional
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
});

export const genreBoostTable = sqliteTable('genre_boost', {
    id: integer('id').primaryKey(),
    genre: text('genre').notNull(),
    boost: integer('boost').notNull(),
});

export const seenListTable = sqliteTable('seen_list', {
    id: integer('id').primaryKey(),
    userId: text('user_id').notNull().references(usersTable.userId), // foreign key to users table
});

export const seenListMoviesTable = sqliteTable('seen_list_movies', {
    seenListId: integer('seen_list_id').notNull().references(seenListTable.id), // foreign key to seen_list table
    movieId: integer('movie_id').notNull().references(moviesTable.id), // foreign key to movies table
});

export const seenListGenreBoostTable = sqliteTable('seen_list_genre_boost', {
    seenListId: integer('seen_list_id').notNull().references(seenListTable.id), // foreign key to seen_list table
    genreBoostId: integer('genre_boost_id')
        .notNull()
        .references(genreBoostTable.id), // foreign key to genre_boost table
});

export const groupInfoTable = sqliteTable('group_info', {
    groupId: integer('group_id').primaryKey(),
    groupAdmin: text('group_admin').notNull().references(usersTable.userId), // foreign key to users table
});

export const groupMembersTable = sqliteTable('group_members', {
    id: integer('id').primaryKey(),
    groupId: integer('group_id').notNull().references(groupInfoTable.groupId), // foreign key to group_info table
    userId: text('user_id').notNull().references(usersTable.userId), // foreign key to users table
});

