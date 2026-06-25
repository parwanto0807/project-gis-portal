import prisma from '../config/prisma.js';
import { StatusCodes } from 'http-status-codes';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

// Helper for processing base64 images
const processBase64Images = async (base64Array, prefixFolder) => {
    if (!base64Array || !Array.isArray(base64Array)) return [];
    const urls = [];
    
    // Ensure directory exists — save under src/uploads/suggestions so /uploads nginx proxy serves it
    const dir = path.join(process.cwd(), 'src', 'uploads', 'suggestions');
    try { await fs.mkdir(dir, { recursive: true }); } catch(e){}

    for (let i = 0; i < base64Array.length; i++) {
        const item = base64Array[i];
        if (!item) continue;
        
        try {
            // Check if it's a data url
            if (item.startsWith('data:image')) {
                const base64Data = item.split(';base64,').pop();
                const buffer = Buffer.from(base64Data, 'base64');
                const filename = `${prefixFolder}-${Date.now()}-${i}.webp`;
                
                await sharp(buffer)
                    .webp({ quality: 80 })
                    .toFile(path.join(dir, filename));
                    
                urls.push(`/uploads/suggestions/${filename}`);
            } else {
                // If it's already a URL, just keep it
                urls.push(item);
            }
        } catch (err) {
            console.error('Error processing image:', err);
        }
    }
    return urls;
};

const generateFormNo = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    const prefix = `IMP-${year}${month}-`;
    
    const lastSuggestion = await prisma.improvementSuggestion.findFirst({
        where: { noForm: { startsWith: prefix } },
        orderBy: { noForm: 'desc' }
    });

    if (lastSuggestion) {
        const lastNumber = parseInt(lastSuggestion.noForm.slice(-4), 10);
        return `${prefix}${String(lastNumber + 1).padStart(4, '0')}`;
    }
    
    return `${prefix}0001`;
};

export const createSuggestion = async (req, res, next) => {
    try {
        const noForm = await generateFormNo();
        
        const data = {
            ...req.body,
            noForm,
            tanggal: new Date(req.body.tanggal),
        };

        if (req.body.targetSelesai) data.targetSelesai = new Date(req.body.targetSelesai);
        if (req.body.tanggalAktual) data.tanggalAktual = new Date(req.body.tanggalAktual);
        if (req.body.tanggalApproval) data.tanggalApproval = new Date(req.body.tanggalApproval);
        
        // Handle Images
        if (req.body.fotoKondisiBase64) {
            data.fotoKondisiUrls = await processBase64Images(req.body.fotoKondisiBase64, `KONDISI-${noForm}`);
        }
        delete data.fotoKondisiBase64; // Remove base64 from payload before db save
        
        const newSuggestion = await prisma.improvementSuggestion.create({
            data
        });
        
        res.status(StatusCodes.CREATED).json({ success: true, data: newSuggestion, message: 'Suggestion created successfully' });
    } catch (error) {
        next(error);
    }
};

export const getSuggestions = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const [suggestions, total] = await Promise.all([
            prisma.improvementSuggestion.findMany({
                skip: parseInt(skip),
                take: parseInt(limit),
                orderBy: { createdAt: 'desc' },
            }),
            prisma.improvementSuggestion.count(),
        ]);

        res.json({
            success: true,
            data: suggestions,
            meta: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getSuggestionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const suggestion = await prisma.improvementSuggestion.findUnique({
            where: { id: parseInt(id) }
        });

        if (!suggestion) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Suggestion not found' });
        }

        res.json({ success: true, data: suggestion });
    } catch (error) {
        next(error);
    }
};

export const updateSuggestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const data = { ...req.body };
        if (req.body.tanggal) data.tanggal = new Date(req.body.tanggal);
        if (req.body.targetSelesai) data.targetSelesai = new Date(req.body.targetSelesai);
        if (req.body.tanggalAktual) data.tanggalAktual = new Date(req.body.tanggalAktual);
        if (req.body.tanggalApproval) data.tanggalApproval = new Date(req.body.tanggalApproval);
        
        // Handle Images
        if (req.body.fotoKondisiBase64) {
            data.fotoKondisiUrls = await processBase64Images(req.body.fotoKondisiBase64, `KONDISI-${id}`);
        }
        if (req.body.fotoEvaluasiBase64) {
            data.fotoEvaluasiUrls = await processBase64Images(req.body.fotoEvaluasiBase64, `EVALUASI-${id}`);
        }
        
        delete data.fotoKondisiBase64;
        delete data.fotoEvaluasiBase64;
        
        // Don't update noForm
        delete data.noForm;

        const updatedSuggestion = await prisma.improvementSuggestion.update({
            where: { id: parseInt(id) },
            data
        });
        
        res.json({ success: true, data: updatedSuggestion, message: 'Suggestion updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteSuggestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.improvementSuggestion.delete({
            where: { id: parseInt(id) }
        });
        res.json({ success: true, message: 'Suggestion deleted successfully' });
    } catch (error) {
        next(error);
    }
};
