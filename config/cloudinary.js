import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up storage for images
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'personal-docs/images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
});

// Set up storage for PDFs
const pdfStorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'personal-docs/pdfs',
        resource_type: 'raw',
        allowed_formats: ['pdf']
    }
});

// Export as named exports
export { cloudinary, imageStorage, pdfStorage };