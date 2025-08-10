import bcryptjs from 'bcryptjs';
import createError from 'http-errors';
import AllStatusCodes from './allStatusCodes.js';

const SALT_WORK_FACTOR = 10; // no. of rounds for hashing original password

export const generateHashPass = async password => {
    try {
        // console.log('password: ', password);
        const salt = await bcryptjs.genSalt(SALT_WORK_FACTOR);
        const hash = await bcryptjs.hash(password, salt);
        return hash;
    } catch (error) {
        throw createError(AllStatusCodes.BadRequest, error);
    }
};