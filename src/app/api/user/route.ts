import { NextResponse } from 'next/server';
import { db } from 'db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import verifyUser from '@/actions/logIn/authenticateUser';

export async function GET() {
    try {
        const userId = await verifyUser(); // skaffer logged-in user's ID fra token/cookie
        if (!userId) {
            console.error('Unauthorized: No user ID found');
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 } // hvis der ikke er nogen userId i tokenet (invalid token or not logged in), return a 401 Unauthorized.
            );
        }

        //console.log('User ID:', userId); // Debugging

        // Forespørg bruger fra databassen baseret på ID og hent kun brugenavnetr
        const user = await db
            .select({ username: usersTable.username })
            .from(usersTable)
            .where(eq(usersTable.id, userId))
            .limit(1);

        //console.log('Query Result:', user); // Debugging - den udskriver database-resultart

        // if ingen bruger blev fundet, send 404 Not Found
        if (user.length === 0) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        //og igen hvis boget gik galt igen i databaseforbindelsen så send 500 fejl
        return NextResponse.json({ username: user[0].username });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
