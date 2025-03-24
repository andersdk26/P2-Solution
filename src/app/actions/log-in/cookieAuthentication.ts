'use server';

import { promises } from 'dns';
import jwt from 'jsonwebtoken';

interface generateTokenProps {
    userId: string;
}

export async function generateToken({
    userId,
}: generateTokenProps): Promise<string> {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    // JWT token with HS512 algorithm
    return new Promise((resolve, reject) => {
        jwt.sign(
            { userId },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1d',
                algorithm: 'HS512',
            },
            (err, token) => {
                if (err) {
                    return reject(new Error('JWT token generation failed'));
                }

                if (!token) {
                    return reject(new Error('JWT token is not defined'));
                }

                resolve(token);
            }
        );
    });
}

interface verifyTokenProps {
    token: string;
}

export function verifyToken({ token }: verifyTokenProps): Promise<object> {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    // Verify JWT token with HS512 or HS256 algorithm
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as string,
            {
                maxAge: '7d',
                algorithms: ['HS512', 'HS256'],
            },
            (err, decoded) => {
                if (err) {
                    return reject(new Error('JWT token verification failed'));
                }

                if (!decoded) {
                    return reject(new Error('JWT token is not defined'));
                }

                resolve(decoded as object);
            }
        );
    });
}
