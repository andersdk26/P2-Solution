'use server';

import { db } from 'db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import defaultResponse from '@/components/defaultResponse';

//adds a prefixed profile picture to the users profile when signedUp
