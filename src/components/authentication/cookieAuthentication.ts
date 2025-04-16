'use server';

import userLogout from '@/actions/logIn/userLogout';
import jwt from 'jsonwebtoken';
import redirectServer from '../redirectServer';
import { setCookie } from '@/actions/logIn/userLogin';

export async function generateToken(userId: string): Promise<string> {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    // Create JWT token with HS512 algorithm
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

export async function verifyToken(token: string): Promise<number> {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    // Verify JWT token with HS512 or HS256 algorithm
    const userId: Promise<number> = new Promise((resolve, reject): void => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as string,
            {
                maxAge: '7d',
                algorithms: ['HS512', 'HS256'],
            },
            (err, decoded) => {
                if (err) {
                    userLogout();
                    redirectServer('logIn');
                    return reject(new Error('JWT token verification failed'));
                }

                if (!decoded) {
                    userLogout();
                    redirectServer('logIn');
                    return reject(new Error('JWT token is not defined'));
                }

                // Extract the userId field from the decoded object
<<<<<<< Updated upstream
                const userId = typeof decoded === 'object' && decoded !== null ? decoded.userId : undefined;
=======
                const userId =
                    typeof decoded === 'object' && decoded !== null
                        ? decoded.userId
                        : undefined;
>>>>>>> Stashed changes

                // Validate that userId is a valid number
                if (typeof userId !== 'number' || isNaN(userId)) {
                    return reject(new Error('Invalid or missing userId in token'));
                }

                // Resolve the promise with the numeric userId
                resolve(userId);
            }
        );
    });

    const newToken = generateToken(((await userId) || 0).toString());
    setCookie(await newToken);

    return await userId;
}
