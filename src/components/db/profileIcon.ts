import { db } from 'db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import argon2 from 'argon2';
import defaultResponse from '@/components/defaultResponse';
import { randomInt } from 'crypto';
