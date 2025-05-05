// // MySQL
// import { sql } from 'drizzle-orm';
// import {
//     int,
//     mysqlTable,
//     serial,
//     timestamp,
//     varchar,
//     uniqueIndex,
// } from 'drizzle-orm/mysql-core';

// // *** Movie ***
// export const moviesTable = mysqlTable(
//     'movies',
//     {
//         id: int('id').primaryKey(),
//         title: varchar('title', { length: 255 }).notNull(),
//         genres: varchar('genres', { length: 255 }).notNull(),
//     }
//     // (table) => ({
//     //     // Fulltext index på title og genres
//     //     fulltextIndex: fullTextIndex('fulltext_idx', [
//     //         table.title,
//     //         table.genres,
//     //     ]),
//     // })
// );

// // run ALTER TABLE movies ADD FULLTEXT INDEX fulltext_idx (title);

// export type InsertMovie = typeof moviesTable.$inferInsert;
// export type SelectMovie = typeof moviesTable.$inferSelect;

// export const movieLinkIdTable = mysqlTable('movie_link_id', {
//     id: int('id').primaryKey(),
//     imdbId: int('imdbId').notNull(),
//     tmdbId: int('tmdbId').notNull(),
// });

// export type InsertMovieLinkId = typeof movieLinkIdTable.$inferInsert;
// export type SelectMovieLinkId = typeof movieLinkIdTable.$inferSelect;

// export const IMDBImageIdTable = mysqlTable('imdb_image_id', {
//     id: int('id').primaryKey(),
//     imageId: int('imageId', { unsigned: true }).notNull(),
// });

// export type InsertIMDBImageId = typeof IMDBImageIdTable.$inferInsert;
// export type SelectIMDBImageId = typeof IMDBImageIdTable.$inferSelect;

// export const movieImageCacheTable = mysqlTable('movie_image_cache', {
//     id: serial('id').primaryKey(), // auto increment
//     movieId: int('movieId')
//         .notNull()
//         .references(() => moviesTable.id),
//     url: varchar('url', { length: 255 }).notNull(),
//     blurHash: varchar('blurHash', { length: 255 }),
//     timestamp: timestamp('timestamp')
//         .default(sql`(CURRENT_TIMESTAMP)`)
//         .notNull(),
// });

// export type InsertmovieImageCache = typeof movieImageCacheTable.$inferInsert;
// export type SelectmovieImageCache = typeof movieImageCacheTable.$inferSelect;

// // *** User ***
// export const usersTable = mysqlTable('users', {
//     id: int('id', {
//         unsigned: true,
//     }).primaryKey(),
//     username: varchar('username', { length: 30 }).notNull(),
//     email: varchar('email', { length: 255 }).unique().notNull(),
//     password: varchar('password', { length: 255 }).notNull(),
//     createdAt: timestamp('created_at')
//         .default(sql`(CURRENT_TIMESTAMP)`)
//         .notNull(),
//     lastLogin: timestamp('last_login').default(sql`(CURRENT_TIMESTAMP)`),
//     profileIcon: varchar('profile_icon', { length: 255 }),
// });

// export const friendsTable = mysqlTable('friends', {
//     id: int('id').primaryKey().autoincrement(),
//     userIdA: int('userIdA').notNull(),
//     userIdB: int('userIdB').notNull(),
//     status: int('status').notNull(),
// });

// export type InserFriend = typeof friendsTable.$inferInsert;
// export type SelectFriend = typeof friendsTable.$inferSelect;

// export const watchlistTable = mysqlTable('watchlist', {
//     id: int('id').primaryKey().autoincrement(),
//     movieid: int('movieId')
//         .notNull()
//         .references(() => moviesTable.id),
//     userid: int('userId', {
//         unsigned: true,
//     })
//         .notNull()
//         .references(() => usersTable.id),
// });

// export type InsertWatchlist = typeof watchlistTable.$inferInsert;
// export type SelectWatchlist = typeof watchlistTable.$inferSelect;

// // *** Groups ***
// export const groupsTable = mysqlTable('groups', {
//     groupId: int('groupId').primaryKey(),
//     groupName: varchar('groupName', { length: 16 }).notNull(),
//     adminId: int('adminId').notNull(),
//     members: varchar('members', { length: 100 }).notNull(),
// });

// export type InsertGroup = typeof groupsTable.$inferInsert;
// export type SelectGroup = typeof groupsTable.$inferSelect;

// export const groupInfoTable = mysqlTable('group_info', {
//     groupId: int('group_id').primaryKey(),
//     groupAdmin: int('group_admin', {
//         unsigned: true,
//     })
//         .notNull()
//         .references(() => usersTable.id), // foreign key to users table
// });

// export type InsertGroupInfo = typeof groupInfoTable.$inferInsert;
// export type SelectGroupInfo = typeof groupInfoTable.$inferSelect;

// export const groupMembersTable = mysqlTable('group_members', {
//     id: int('id').primaryKey(),
//     groupId: int('group_id')
//         .notNull()
//         .references(() => groupInfoTable.groupId), // foreign key to group_info table
//     userId: int('user_id', {
//         unsigned: true,
//     })
//         .notNull()
//         .references(() => usersTable.id), // foreign key to users table
// });

// export type InsertGroupMember = typeof groupMembersTable.$inferInsert;
// export type SelectGroupMembers = typeof groupMembersTable.$inferSelect;

// export const groupRequestsTable = mysqlTable('group_requests', {
//     id: int('id').primaryKey().autoincrement(),
//     userId: int('userId').notNull(),
//     groupId: int('groupId').notNull(),
// });

// export type InsertGroupRequestsTable = typeof groupRequestsTable.$inferInsert;
// export type SelectGroupRequestsTable = typeof groupRequestsTable.$inferSelect;

// // *** Ratings ***
// export const ratingsTable = mysqlTable(
//     'ratings',
//     {
//         id: serial('id').primaryKey(),
//         userId: int('userId', {
//             unsigned: true,
//         }).notNull(),
//         movieId: int('movieId')
//             .notNull()
//             .references(() => moviesTable.id), // foreign key to movies table,
//         rating: int('rating').notNull(),
//         timestamp: timestamp('timestamp').default(sql`(CURRENT_TIMESTAMP)`),
//     },
//     (table) => ({
//         // Definerer en unik constraint på (user_id, movie_id)
//         userMovieUnique: uniqueIndex('user_movie_unique').on(
//             table.userId,
//             table.movieId
//         ),
//     })
// );

// export type InsertRatings = typeof ratingsTable.$inferInsert;
// export type SelectRatings = typeof ratingsTable.$inferSelect;

// *** SQLite ***
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

// *** Movie ***
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

// *** User ***
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

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const friendsTable = sqliteTable('friends', {
    id: integer('id').primaryKey(),
    userIdA: integer('userIdA').notNull(),
    userIdB: integer('userIdB').notNull(),
    status: integer('status').notNull(),
});

export type InserFriend = typeof friendsTable.$inferInsert;
export type SelectFriend = typeof friendsTable.$inferSelect;

export const watchlistTable = sqliteTable('watchlist', {
    id: integer('id').primaryKey(),
    movieid: integer('movieId')
        .notNull()
        .references(() => moviesTable.id),
    userid: integer('userId')
        .notNull()
        .references(() => usersTable.id),
});

export type InsertWatchlist = typeof watchlistTable.$inferInsert;
export type SelectWatchlist = typeof watchlistTable.$inferSelect;

// *** Groups ***
export const groupsTable = sqliteTable('groups', {
    groupId: integer('groupId').notNull(),
    groupName: text('groupName').notNull(),
    adminId: integer('adminId').notNull(),
    members: text('members').notNull(),
    settings: text('settings').notNull(),
});

export type InsertGroup = typeof groupsTable.$inferInsert;
export type SelectGroup = typeof groupsTable.$inferSelect;

export const groupInfoTable = sqliteTable('group_info', {
    groupId: integer('group_id').primaryKey(),
    groupAdmin: text('group_admin')
        .notNull()
        .references(() => usersTable.id), // foreign key to users table
});

export type InsertGroupInfo = typeof groupInfoTable.$inferInsert;
export type SelectGroupInfo = typeof groupInfoTable.$inferSelect;

export const groupMembersTable = sqliteTable('group_members', {
    id: integer('id').primaryKey(),
    groupId: integer('group_id')
        .notNull()
        .references(() => groupInfoTable.groupId), // foreign key to group_info table
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id), // foreign key to users table
});

export type InsertGroupMember = typeof groupMembersTable.$inferInsert;
export type SelectGroupMembers = typeof groupMembersTable.$inferSelect;

export const groupRequestsTable = sqliteTable('groupRequests', {
    id: integer('id').primaryKey(),
    userId: integer('userId').notNull(),
    groupId: integer('groupId').notNull(),
});

export type InsertGroupRequestsTable = typeof groupRequestsTable.$inferInsert;
export type SelectGroupRequestsTable = typeof groupRequestsTable.$inferSelect;

// *** Ratings ***
export const ratingsTable = sqliteTable(
    'testRatings',
    {
        id: integer('id').primaryKey(),
        userId: integer('userId').notNull(),
        movieId: integer('movieId').notNull(),
        rating: integer('rating').notNull(),
        timestamp: text('timestamp')
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
    },
    (table) => ({
        uniqueUserMovie: unique().on(table.userId, table.movieId), // Add UNIQUE constraint
    })
);

export type InsertRatingsTable = typeof ratingsTable.$inferInsert;
export type SelectRatingsTable = typeof ratingsTable.$inferSelect;

// To update the schema, run: npx drizzle-kit push
// After deleting fts tables, run: CREATE VIRTUAL TABLE movies_fts USING fts5(id UNINDEXED, title, genres); INSERT INTO movies_fts (rowid, id, title, genres) SELECT id, id, title, genres FROM movies;
