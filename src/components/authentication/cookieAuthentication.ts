'use server';

import userLogout from '@/actions/logIn/userLogout';
import jwt from 'jsonwebtoken';
import redirectServer from '../redirectServer';
import { setCookie } from '@/actions/logIn/userLogin';

export async function generateToken(userId: string): Promise<string> {
    // encryption key jwt_secret
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    // making an object from userId
    const object = JSON.stringify({ userId });

    // Create JWT token with HS512 algorithm
    return new Promise((resolve, reject) => {
        jwt.sign(
            { object },
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

                // if everything works, return token
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

                // Check decoded message is an object
                if (
                    typeof decoded !== 'object' ||
                    typeof (decoded as jwt.JwtPayload).object !== 'string'
                ) {
                    userLogout();
                    redirectServer('logIn');
                    return reject(new Error('JWT token missing userId'));
                }

                // Extract the userId field from the decoded object
                const decodedObject = JSON.parse(decoded.object);
                const userId = parseInt(decodedObject.userId);

                // Validate that userId is a valid number
                if (typeof userId !== 'number' || isNaN(userId)) {
                    return reject(
                        new Error('Invalid or missing userId in token')
                    );
                }

                // Resolve the promise with the numeric userId
                resolve(userId);
            }
        );
    });

    const newToken = generateToken((await userId).toString());
    setCookie(await newToken);

    return await userId;
}
