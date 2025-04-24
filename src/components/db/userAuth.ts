import { db } from 'db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import argon2 from 'argon2';
import defaultResponse from '@/components/defaultResponse';
import { randomInt } from 'crypto';

interface loginCheckProps {
    username: string;
    password: string;
}

export async function login_check({
    username,
    password,
}: loginCheckProps): Promise<defaultResponse> {
    // Select matching user from the database
    const result = await db
        .select({
            id: usersTable.id,
            username: usersTable.username,
            password: usersTable.password,
        })
        .from(usersTable)
        .where(eq(usersTable.username, username));

    // Check if the user exists
    if (result.length === 0) {
        console.log('User not found');
        return { status: 404, message: 'User not found' };
    }

    // Verify the password
    if (!(await argon2.verify(result[0].password, password))) {
        console.log('Incorrect password');
        return { status: 401, message: 'Incorrect password' };
    }

    console.log('Login successful');
    return { status: 200, object: { id: result[0].id } };
}

interface registerUserProps {
    username: string;
    email: string;
    password: string;
    profileIcon: string;
}

export async function register_user({
    username,
    email,
    password,
    profileIcon,
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
            userId = randomInt(1000000000, 10000000000);

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
                profileIcon,
            })
            .returning();

        if (result.length === 0) {
            throw new Error('No user inserted');
        }
    } catch (error) {
        console.error('Error inserting user:', error);
        return { status: 500, message: 'Internal server error' };
    }

    return { status: 201, object: { id: userId } };
}











