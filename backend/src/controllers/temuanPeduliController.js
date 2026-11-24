import { StatusCodes } from 'http-status-codes';
import prisma from '../config/prisma.js';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const processTemuanFiles = async (filesArray, prefix) => {
    if (!filesArray || !Array.isArray(filesArray)) return [];
    const urls = [];
    const dir = path.join(process.cwd(), 'src', 'uploads');
    try { await fs.mkdir(dir, { recursive: true }); } catch (e) {}

    for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        try {
            const filename = `${prefix}-${Date.now()}-${i}.webp`;
            const destPath = path.join(dir, filename);

            await sharp(file.path)
                .rotate() // Auto-orient based on EXIF
                .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(destPath);

            urls.push(`/uploads/${filename}`);

            if (file.path !== destPath) {
                await fs.unlink(file.path).catch(() => {});
            }
        } catch (err) {
            console.error('Error compressing temuan image, falling back to original:', err);
            urls.push(`/uploads/${file.filename}`);
        }
    }
    return urls;
};

export const getAllTemuan = async (req, res, next) => {
    try {
        const where = {};
        if (req.user.role === 'USER') {
            where.userId = req.user.userId;
        }

        const temuanList = await prisma.temuanPeduli.findMany({
            where,
            include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.status(StatusCodes.OK).json({ success: true, data: temuanList });
    } catch (error) {
        next(error);
    }
};

export const createTemuan = async (req, res, next) => {
    try {
        const { area, tanggal, jam, kategori4M, temuan, tempatTemuan, status, tindakanPerbaikan } = req.body;
        const userId = req.user.userId || req.user.id;
        
        let kategoriArray = [];
        if (typeof kategori4M === 'string') {
            try {
                kategoriArray = JSON.parse(kategori4M);
            } catch (e) {
                kategoriArray = [kategori4M];
            }
        } else if (Array.isArray(kategori4M)) {
            kategoriArray = kategori4M;
        }

        const fotoUrls = req.files && req.files['fotos'] ? await processTemuanFiles(req.files['fotos'], 'temuan') : [];
        const fotoPerbaikanUrls = req.files && req.files['fotoPerbaikan'] ? await processTemuanFiles(req.files['fotoPerbaikan'], 'perbaikan') : [];

        const newTemuan = await prisma.temuanPeduli.create({
            data: {
                area,
                tanggal: new Date(tanggal),
                jam,
                userId: userId,
                kategori4M: kategoriArray,
                temuan,
                tempatTemuan,
                fotoUrls,
                ...(status && { status }),
                ...(tindakanPerbaikan && { tindakanPerbaikan }),
                ...(fotoPerbaikanUrls.length > 0 && { fotoPerbaikanUrls })
            }
        });

        await prisma.userLog.create({
            data: {
                userId,
                action: 'CREATE',
                module: 'TEMUAN_PEDULI',
                description: `Menambahkan temuan baru di area ${area}`
            }
        });

        res.status(StatusCodes.CREATED).json({ success: true, data: newTemuan, message: 'Temuan created successfully' });
    } catch (error) {
        next(error);
    }
};

export const updateTemuan = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { area, tanggal, jam, kategori4M, temuan, tempatTemuan, existingFotos, status, tindakanPerbaikan, existingFotoPerbaikan } = req.body;
        
        let kategoriArray = [];
        if (kategori4M) {
            if (typeof kategori4M === 'string') {
                try {
                    kategoriArray = JSON.parse(kategori4M);
                } catch (e) {
                    kategoriArray = [kategori4M];
                }
            } else if (Array.isArray(kategori4M)) {
                kategoriArray = kategori4M;
            }
        }

        let parsedExistingFotos = [];
        if (existingFotos) {
            if (typeof existingFotos === 'string') {
                try {
                    parsedExistingFotos = JSON.parse(existingFotos);
                } catch (e) {
                    parsedExistingFotos = [existingFotos];
                }
            } else if (Array.isArray(existingFotos)) {
                parsedExistingFotos = existingFotos;
            }
        }

        let parsedExistingFotoPerbaikan = [];
        if (existingFotoPerbaikan) {
            if (typeof existingFotoPerbaikan === 'string') {
                try {
                    parsedExistingFotoPerbaikan = JSON.parse(existingFotoPerbaikan);
                } catch (e) {
                    parsedExistingFotoPerbaikan = [existingFotoPerbaikan];
                }
            } else if (Array.isArray(existingFotoPerbaikan)) {
                parsedExistingFotoPerbaikan = existingFotoPerbaikan;
            }
        }

        const newFotoUrls = req.files && req.files['fotos'] ? await processTemuanFiles(req.files['fotos'], 'temuan') : [];
        const finalFotoUrls = [...parsedExistingFotos, ...newFotoUrls];

        const newFotoPerbaikanUrls = req.files && req.files['fotoPerbaikan'] ? await processTemuanFiles(req.files['fotoPerbaikan'], 'perbaikan') : [];
        const finalFotoPerbaikanUrls = [...parsedExistingFotoPerbaikan, ...newFotoPerbaikanUrls];

        const updatedTemuan = await prisma.temuanPeduli.update({
            where: { id: parseInt(id) },
            data: {
                ...(area && { area }),
                ...(tanggal && { tanggal: new Date(tanggal) }),
                ...(jam && { jam }),
                ...(kategoriArray.length > 0 && { kategori4M: kategoriArray }),
                ...(temuan && { temuan }),
                ...(tempatTemuan && { tempatTemuan }),
                fotoUrls: finalFotoUrls,
                ...(status && { status }),
                ...(tindakanPerbaikan !== undefined && { tindakanPerbaikan }),
                fotoPerbaikanUrls: finalFotoPerbaikanUrls
            }
        });

        const userId = req.user.userId || req.user.id;
        await prisma.userLog.create({
            data: {
                userId,
                action: 'UPDATE',
                module: 'TEMUAN_PEDULI',
                description: `Mengubah data temuan ID: ${id}`
            }
        });

        res.status(StatusCodes.OK).json({ success: true, data: updatedTemuan, message: 'Temuan updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteTemuan = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.temuanPeduli.delete({ where: { id: parseInt(id) } });

        const userId = req.user.userId || req.user.id;
        await prisma.userLog.create({
            data: {
                userId,
                action: 'DELETE',
                module: 'TEMUAN_PEDULI',
                description: `Menghapus data temuan ID: ${id}`
            }
        });

        res.status(StatusCodes.OK).json({ success: true, message: 'Temuan deleted successfully' });
    } catch (error) {
        next(error);
    }
};
