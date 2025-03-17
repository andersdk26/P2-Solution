import { db } from 'db';
import { usersTable } from 'db/schema';
import { eq } from 'drizzle-orm';
import argon2 from 'argon2';
import defaultResponse from './defaultResponse';

interface loginCheckProps {
    username: string;
    password: string;
}

export async function login_check({
    username,
    password,
}: loginCheckProps): Promise<defaultResponse> {
    const result = await db
        .select({
            username: usersTable.username,
            password: usersTable.password,
        })
        .from(usersTable)
        .where(eq(usersTable.username, username));

    if (result.length === 0) {
        console.log('User not found');
        return { status: 404, message: 'User not found' };
    }

    if (!argon2.verify(result[0].password, password)) {
        console.log('Incorrect password');
        return { status: 401, message: 'Incorrect password' };
    }

    console.log('Login successful');
    return { status: 200, message: 'Login successful' };
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
}: registerUserProps): Promise<defaultResponse> {
    let passwordHash: string;
    let userId: number;

    // Hash the password
    try {
        passwordHash = await argon2.hash(password);
    } catch (error) {
        console.error('Error hashing password:', error);
        return { status: 500, message: 'Internal server error' };
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
            throw new Error('Duplicate user');
        }
    } catch (error) {
        console.error('User already exists:', error);
        return { status: 409, message: 'User already exists' };
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
                throw new Error('Could not generate unique user ID');
            }
        }
    } catch (error) {
        console.error('Error generating user ID:', error);
        return { status: 500, message: 'Internal server error' };
    }

    // Insert the user into the database
    try {
        const result = await db
            .insert(usersTable)
            .values({
                id: userId,
                username,
                email,
                password: passwordHash,
            })
            .returning();

        if (result.length === 0) {
            throw new Error('No user inserted');
        }
    } catch (error) {
        console.error('Error inserting user:', error);
        return { status: 500, message: 'Internal server error' };
    }

    return { status: 201, message: 'User created' };
}
