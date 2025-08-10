import multer from 'multer';
import { imageStorage, pdfStorage } from './cloudinary.js'

const imageUpload = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});
const pdfUpload = multer({ storage: pdfStorage });

// Middleware for single image upload
const uploadImage = imageUpload.single('image');



// Middleware for multiple PDF uploads
const uploadPDFs = pdfUpload.array('documents', 5); // Max 5 files


const UploadMiddleware = {
    uploadImage,
    uploadPDFs,
};

export default UploadMiddleware;