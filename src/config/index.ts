import * as dotenv from 'dotenv';
dotenv.config();


export const JWT_SECRET = process.env.JWT_SECRET ?? ''
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS ?? '')
export const DB = process.env.DB ?? 'my_database'
