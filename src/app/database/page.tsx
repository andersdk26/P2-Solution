import { db } from 'db';
import { postsTable, usersTable } from 'db/schema';
import { JSX } from 'react';

interface postsObjectProps {
    title: string;
    content: string;
}

export default async function database(): Promise<JSX.Element> {
    const posts = await db.query.postsTable.findMany();
    return (
        <>
            <form
                action={async () => {
                    'use server';
                    const num = Math.ceil(Math.random() * 100000);
                    await db.insert(usersTable).values({
                        id: num,
                        age: 20,
                        email: `test${num}@test.com`,
                        name: `name${num}`,
                    });
                    await db.insert(postsTable).values({
                        title: 'Title',
                        content: num.toString(),
                        userId: num,
                    });
                }}
            >
                <button type="submit">Submit</button>
            </form>
            <article>
                {/* <button
                    onClick={async () => {
                        const result = await db.query.postsTable.findFirst();

                        if (result) {
                            lastPost = {
                                title: result.title,
                                content: result.content,
                            };
                        }
                    }}
                >
                    GET
                </button>
                {lastPost !== null && (
                    <p>
                        Title: {lastPost!.title}, content: {lastPost!.content}
                    </p>
                )} */}
                {posts.map((post) => (
                    <p key={post.content}>
                        Title: {post!.title}, content: {post!.content}
                    </p>
                ))}
            </article>
        </>
    );
}
