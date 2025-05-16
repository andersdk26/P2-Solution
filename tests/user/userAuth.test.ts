import { db } from '@/db/index';
import { login_check, register_user } from '../../src/components/db/userAuth';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Login
test('Logging in for user "test"', async () => {
    expect(
        await login_check({ username: 'test', password: 'abcd1234' })
    ).toStrictEqual({
        status: 200,
        object: { id: 2985098603 },
    });
});

test('Loggin in for user "test" with incorrect password', async () => {
    expect(
        await login_check({ username: 'test', password: 'Abcd1234' })
    ).toStrictEqual({
        status: 401,
        message: 'Incorrect password',
    });
});

test('Loggin in for unknown user', async () => {
    expect(
        await login_check({ username: 'qkblyadsf', password: 'abcd1234' })
    ).toStrictEqual({
        status: 404,
        message: 'User not found',
    });
});

// Signup
test('Create duplicate user "test"', async () => {
    expect(
        await register_user({
            username: 'test',
            email: 'pqowieu@jkds.com',
            password: 'abcd1234',
            profileIcon: '',
        })
    ).toStrictEqual({
        status: 409,
        message: 'Username or Email already exists',
    });
});

test('Create duplicate user "dont.delete@test.com"', async () => {
    expect(
        await register_user({
            username: 'theTester',
            email: 'dont.delete@test.com',
            password: 'abcd1234',
            profileIcon: '',
        })
    ).toStrictEqual({
        status: 409,
        message: 'Username or Email already exists',
    });
});

test('Create new user "test12"', async () => {
    const returned = await register_user({
        username: 'test12',
        email: 'do.delete@test.com',
        password: 'abcd1234',
        profileIcon: '',
    });

    await db.delete(usersTable).where(eq(usersTable.username, 'test12'));

    expect(returned.status).toEqual(201);
    expect(returned.object).toEqual({
        id: expect.any(Number),
    });
});
