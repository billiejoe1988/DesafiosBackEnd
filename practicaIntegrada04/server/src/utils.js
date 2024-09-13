import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcryptjs from 'bcryptjs';

export const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @param password 
 * @returns
 */
export const createHash = password => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

/**
 * 
 * @param {*} user
 * @param {*} password 
 * @returns 
 */
export const isValidPassword = (user, password) => bcryptjs.compareSync(password, user.password);

export const createResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({data})
}
