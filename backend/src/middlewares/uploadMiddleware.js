import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = crypto.randomBytes(8).toString('hex');
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${uniqueSuffix}${ext}`);
    }
});

export const upload = multer({
    storage,
    limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB per file limit (supports large smartphone photos)
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
            'image/heic',
            'image/heif'
        ];
        if (allowedMimeTypes.includes(file.mimetype.toLowerCase()) || file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Format file tidak didukung. Gunakan foto format JPEG, PNG, WebP, atau HEIC.'));
        }
    }
});

const backupStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = crypto.randomBytes(8).toString('hex');
        const ext = path.extname(file.originalname);
        cb(null, `restore-${Date.now()}-${uniqueSuffix}${ext}`);
    }
});

export const backupUpload = multer({
    storage: backupStorage,
    limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB limit for backups
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === '.dump' || ext === '.sql' || ext === '.backup') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only .dump, .sql, and .backup files are allowed.'));
        }
    }
});
