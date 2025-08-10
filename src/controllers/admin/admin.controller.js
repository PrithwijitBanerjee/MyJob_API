import createError from 'http-errors';
import AllStatusCodes from '../../../utils/allStatusCodes.js';
import adminService from '../../services/admin/index.service.js';
import { successResponseHandler } from '../../../utils/response.js';
import bcryptjs from 'bcryptjs';
import { createJWTToken } from '../../../utils/createJWT.js';
import dev from '../../../config/config.js';

export const adminRegistration = async (req, res, next) => {
    try {
        const adminData = await adminService.adminSignUp(req.body);
        if (!adminData) {
            return next(createError(AllStatusCodes.BadRequest, 'Invalid Request Format!!!'));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.Created,
            message: 'Admin added successfully',
            payload: {
                admin: {
                    ...adminData,
                }
            }
        });
    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error?.message));
    }
};

export const adminLogin = async (req, res, next) => {
    try {
        const admin = await adminService.findAdminByEmail(req.body.email);
        if (!admin) {
            return next(createError(AllStatusCodes.NotFound, 'User Not Found ...'));
        }
        
        const isPasswordValid = bcryptjs.compareSync(req.body.password, admin.password);
        if (!isPasswordValid) {
            return next(createError(AllStatusCodes.Unauthorized, 'Invalid email or, password!!!'));
        }
        const accessToken = createJWTToken({
            name: admin.name,
            email: admin.email,
        }, dev.app.jwtSecretKey, '1day');
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: 'Admin Login successfull',
            payload: {
                admin: {
                    ...admin,
                    accessToken,
                },
            },
        });
    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error?.message));
    }
};