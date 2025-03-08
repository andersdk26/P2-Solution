import { db } from 'db';
import { postsTable, usersTable } from 'db/schema';
import { JSX, useState } from 'react';

interface postsObjectProps {
    title: string;
    content: string;
}

export default function database(): JSX.Element {
    const [lastPost, setLastPost] = useState<postsObjectProps | null>(null);

    return (
        <>
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
            <article>
                <button
                    onClick={async () => {
                        const result = await db.query.postsTable.findFirst();

                        if (result) {
                            setLastPost({
                                title: result.title,
                                content: result.content,
                            });
                        }
                    }}
                >
                    GET
                </button>
                {lastPost ? (
                    <p>
                        Title: {lastPost.title}, content: {lastPost.content}
                    </p>
                ) : (
                    ''
                )}
            </article>
        </>
    );
}
