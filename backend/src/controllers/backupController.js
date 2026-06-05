import { StatusCodes } from 'http-status-codes';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const BACKUP_DIR = path.join(process.cwd(), 'src/backups');

if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

export const listBackups = async (req, res, next) => {
    try {
        const files = fs.readdirSync(BACKUP_DIR);
        const backups = files.map(file => {
            const stats = fs.statSync(path.join(BACKUP_DIR, file));
            return {
                filename: file,
                size: stats.size,
                createdAt: stats.birthtime
            };
        }).sort((a, b) => b.createdAt - a.createdAt);

        res.status(StatusCodes.OK).json({ success: true, data: backups });
    } catch (error) {
        next(error);
    }
};

export const createBackup = async (req, res, next) => {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `backup-${timestamp}.dump`;
        const filepath = path.join(BACKUP_DIR, filename);
        
        // Extract connection info from env
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) throw new Error("DATABASE_URL is not defined in .env");

        // Format is custom (-F c) for pg_restore compatibility
        const command = `pg_dump "${dbUrl}" -F c -f "${filepath}"`;
        
        await execPromise(command);

        res.status(StatusCodes.CREATED).json({ 
            success: true, 
            message: 'Backup created successfully',
            data: { filename }
        });
    } catch (error) {
        console.error("Backup Error:", error);
        next(new Error(`Failed to create backup: ${error.message}`));
    }
};

export const downloadBackup = async (req, res, next) => {
    try {
        const { filename } = req.params;
        const filepath = path.join(BACKUP_DIR, filename);

        if (!fs.existsSync(filepath)) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Backup file not found' });
        }

        res.download(filepath);
    } catch (error) {
        next(error);
    }
};

export const deleteBackup = async (req, res, next) => {
    try {
        const { filename } = req.params;
        const filepath = path.join(BACKUP_DIR, filename);

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }

        res.status(StatusCodes.OK).json({ success: true, message: 'Backup deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const restoreBackup = async (req, res, next) => {
    try {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) throw new Error("DATABASE_URL is not defined in .env");

        let filepath;
        
        // Check if an uploaded file exists or an existing filename was provided
        if (req.file) {
            filepath = path.join(process.cwd(), 'src/uploads', req.file.filename);
        } else if (req.body.filename) {
            filepath = path.join(BACKUP_DIR, req.body.filename);
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'No backup file provided' });
        }

        if (!fs.existsSync(filepath)) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Backup file not found' });
        }

        // Restore command using pg_restore with clean and if-exists
        const command = `pg_restore --clean --if-exists -d "${dbUrl}" "${filepath}"`;
        
        await execPromise(command);

        // Delete uploaded temp file if used
        if (req.file && fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }

        res.status(StatusCodes.OK).json({ success: true, message: 'Database restored successfully' });
    } catch (error) {
        console.error("Restore Error:", error);
        next(new Error(`Failed to restore backup: ${error.message}`));
    }
};
