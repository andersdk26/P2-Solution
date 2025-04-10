import { login_check } from '../../src/components/db/userAuth';

test('Logging in for user "test"', async () => {
    expect(
        await login_check({ username: 'test', password: 'abcd1234' })
    ).toStrictEqual({
        status: 200,
        object: { id: 5429199551 },
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
