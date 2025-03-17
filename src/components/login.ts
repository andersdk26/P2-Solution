import { db } from 'db';
import { usersTable } from 'db/schema';
import { eq, SQL } from 'drizzle-orm';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { SqliteError } from 'sqlite';

interface loginCheckProps {
    username: string;
    password: string;
}

export async function login_check({
    username,
    password,
}: loginCheckProps): Promise<void> {
    db.select({ username: usersTable.username, password: usersTable.password })
        .from(usersTable)
        .where(eq(usersTable.username, username))
        .then(async (result) => {
            console.log(await argon2.hash(password));

            if (result.length === 0) {
                console.log('User not found');
                return;
            }

            if (await !argon2.verify(result[0].password, password)) {
                console.log('Incorrect password');
                return;
            }

            console.log('Login successful');
        });
}

interface registerUserProps {
    username: string;
    email: string;
    password: string;
}

export async function register_user({
    username,
    email,
    password,
}: registerUserProps): Promise<boolean> {
    let passwordHash: string;
    let userId: number;

    // Hash the password
    try {
        passwordHash = await argon2.hash(password);
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Error hashing password');
    }

    // Check if the user exists
    try {
        const userExists = await db
            .select({ id: usersTable.id })
            .from(usersTable)
            .where(
                eq(usersTable.username, username) || eq(usersTable.email, email)
            );
        if (userExists.length > 0) {
            return false;
        }
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Error hashing password');
    }

    // Generate a unique user ID
    try {
        let i = 0;
        while (true) {
            userId = Math.floor(Math.random() * 9000000000) + 1000000000;

            const userExists = await db
                .select({ id: usersTable.id })
                .from(usersTable)
                .where(eq(usersTable.id, userId));

            if (userExists.length === 0) {
                break;
            }

            i++;
            if (i > 10) {
                throw new Error('Error generating user ID');
            }
        }
    } catch (error) {
        console.error('Error generating user ID:', error);
        throw new Error('Error generating user ID');
    }

    // Insert the user into the database
    try {
        const result = await db.insert(usersTable).values({
            username,
            email,
            password: passwordHash,
        });
    } catch (error) {
        if (error instanceof SqliteError) {
            // Handle SQLite errors
        }
        console.error('Error inserting user:', error);
        throw new Error('Error inserting user');
    }

    return true; // result handling + error handling(video)
}
