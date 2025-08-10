import createError from "http-errors";
import AllStatusCodes from "./allStatusCodes.js";
import jwt from "jsonwebtoken";

export const createJWTToken = (payload, secretKey, expiryTime) => {
    try {
        if (typeof (payload) !== "object" && Object.keys(payload)?.length === 0) {
            throw createError(AllStatusCodes.BadRequest, 'User information must be an object and User Information should not be empty!!!');
        }
        if (!expiryTime?.length) {
            throw new createError(AllStatusCodes.BadRequest, 'Expiry time can not be empty string!!!');
        }
        const accessToken = jwt.sign(payload, secretKey, {
            expiresIn: expiryTime,
        });
        return accessToken;
    } catch (error) {
        throw new Error(error);
    }
};