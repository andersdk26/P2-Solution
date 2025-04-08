import { login_check } from '../../src/components/db/userAuth';

test('Loggin in for user "test"', () => {
    expect(login_check({ username: 'test', password: 'abcd1234' })).toBe({
        status: 200,
        object: { id: 5429199551 },
    });
});
