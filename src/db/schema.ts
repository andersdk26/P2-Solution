import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
    id: integer('id').primaryKey(),
    username: text('username').notNull(),
    email: text('email').unique().notNull(),
    password: integer('password').notNull(),
    createdAt: text('created_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    lastLogin: text('last_login').default(sql`(CURRENT_TIMESTAMP)`),
    settings: text('settings').default(sql`'{}'`), // JSON stringified object
});

// export const postsTable = sqliteTable('posts', {
//     id: integer('id').primaryKey(),
//     title: text('title').notNull(),
//     content: text('content').notNull(),
//     userId: integer('user_id')
//         .notNull()
//         .references(() => usersTable.id, { onDelete: 'cascade' }),
//     createdAt: text('created_at')
//         .default(sql`(CURRENT_TIMESTAMP)`)
//         .notNull(),
//     updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
//         () => new Date()
//     ),
// });

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
