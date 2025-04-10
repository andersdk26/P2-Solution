import { login_check } from '../../src/components/db/userAuth';

test('Loggin in for user "test"', async () => {
    expect(
        await login_check({ username: 'test', password: 'abcd1234' })
    ).toStrictEqual({
        status: 200,
        object: { id: 5429199551 },
    });
});
