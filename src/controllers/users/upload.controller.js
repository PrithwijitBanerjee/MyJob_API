import createError from 'http-errors';
import AllStatusCodes from '../../../utils/allStatusCodes.js';
import { successResponseHandler } from '../../../utils/response.js';

export const imageUpload = async (req, res, next) => {
    try {
        // console.log('req.file.path: ', req.file.path);

        const imageUrl = req.file.path; // Cloudinary URL
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: 'Image has been uploaded in server successfully',
            payload: {
                imageUrl,
            },
        });
    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error?.message));
    }
};

export const uploadDocument = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return next(createError(AllStatusCodes.BadRequest, 'No Files Uploaded!!!'));
        }
        const uploadedFiles = req.files.map(file => file?.path);
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: 'Documents has been uploaded on server successfully',
            payload: {
                documents: uploadedFiles,
            },
        });
    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error?.message));
    }
};