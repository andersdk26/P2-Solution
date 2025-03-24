'use server';

interface createAuthCookieProps {
    userId: number;
    staySignedin: boolean;
}

function createAuthCookie({ userId, staySignedin }: createAuthCookieProps) {}
