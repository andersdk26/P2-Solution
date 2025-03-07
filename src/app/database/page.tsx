import { db } from 'db';
import { postsTable, usersTable } from 'db/schema';
import { JSX } from 'react';

export default function database(): JSX.Element {
    return (
        <form
            action={async () => {
                'use server';
                await db.insert(usersTable).values({
                    id: 1,
                    age: 20,
                    email: 'test@test.com',
                    name: 'name',
                });
                await db.insert(postsTable).values({
                    title: 'Title',
                    content: 'Content',
                    userId: 1,
                });
            }}
        >
            <button type="submit">Submit</button>
        </form>
    );
}
