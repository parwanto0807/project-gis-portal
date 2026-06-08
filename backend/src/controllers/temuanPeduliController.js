import { StatusCodes } from 'http-status-codes';
import prisma from '../config/prisma.js';

export const getAllTemuan = async (req, res, next) => {
    try {
        const temuanList = await prisma.temuanPeduli.findMany({
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
        const { area, tanggal, jam, kategori4M, temuan, tempatTemuan } = req.body;
        const userId = req.user.id;
        
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

        const fotoUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        const newTemuan = await prisma.temuanPeduli.create({
            data: {
                area,
                tanggal: new Date(tanggal),
                jam,
                userId: userId,
                kategori4M: kategoriArray,
                temuan,
                tempatTemuan,
                fotoUrls
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
        const { area, tanggal, jam, kategori4M, temuan, tempatTemuan, existingFotos } = req.body;
        
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

        const newFotoUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
        const finalFotoUrls = [...parsedExistingFotos, ...newFotoUrls];

        const updatedTemuan = await prisma.temuanPeduli.update({
            where: { id: parseInt(id) },
            data: {
                ...(area && { area }),
                ...(tanggal && { tanggal: new Date(tanggal) }),
                ...(jam && { jam }),
                ...(kategoriArray.length > 0 && { kategori4M: kategoriArray }),
                ...(temuan && { temuan }),
                ...(tempatTemuan && { tempatTemuan }),
                fotoUrls: finalFotoUrls
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
        res.status(StatusCodes.OK).json({ success: true, message: 'Temuan deleted successfully' });
    } catch (error) {
        next(error);
    }
};
