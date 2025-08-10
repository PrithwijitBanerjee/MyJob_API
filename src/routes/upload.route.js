import express from 'express';
import UploadMiddleware from '../../config/upload.js';
import { imageUpload, uploadDocument } from '../controllers/users/upload.controller.js';

const UploadRouter = express.Router({
    caseSensitive: true,
});

UploadRouter.post('/upload-image', UploadMiddleware.uploadImage, imageUpload);

UploadRouter.post('/upload-document', UploadMiddleware.uploadPDFs, uploadDocument);

export default UploadRouter;