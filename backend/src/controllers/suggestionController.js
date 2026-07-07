import prisma from '../config/prisma.js';
import { StatusCodes } from 'http-status-codes';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

// Helper for processing multer files
const processUploadedFiles = async (filesArray, prefixFolder) => {
    if (!filesArray || !Array.isArray(filesArray)) return [];
    const urls = [];
    
    // Ensure directory exists
    const dir = path.join(process.cwd(), 'src', 'uploads', 'suggestions');
    try { await fs.mkdir(dir, { recursive: true }); } catch(e){}

    for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        
        try {
            const filename = `${prefixFolder}-${Date.now()}-${i}.webp`;
            const destPath = path.join(dir, filename);
            
            // Convert to webp
            await sharp(file.path)
                .webp({ quality: 80 })
                .toFile(destPath);
                
            urls.push(`/uploads/suggestions/${filename}`);
            
            // Delete original file uploaded by multer
            await fs.unlink(file.path).catch(() => {});
        } catch (err) {
            console.error('Error processing image:', err);
        }
    }
    return urls;
};

// Fallback for base64 if needed (optional, keeping it just in case old app versions still use it)
const processBase64Images = async (base64Array, prefixFolder) => {
    if (!base64Array || !Array.isArray(base64Array)) return [];
    const urls = [];
    const dir = path.join(process.cwd(), 'src', 'uploads', 'suggestions');
    try { await fs.mkdir(dir, { recursive: true }); } catch(e){}

    for (let i = 0; i < base64Array.length; i++) {
        const item = base64Array[i];
        if (!item) continue;
        try {
            if (item.startsWith('data:image')) {
                const base64Data = item.split(';base64,').pop();
                const buffer = Buffer.from(base64Data, 'base64');
                const filename = `${prefixFolder}-${Date.now()}-${i}.webp`;
                await sharp(buffer).webp({ quality: 80 }).toFile(path.join(dir, filename));
                urls.push(`/uploads/suggestions/${filename}`);
            } else {
                urls.push(item);
            }
        } catch (err) { console.error('Error processing image:', err); }
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
        
        // Form-data converts everything to strings, so parse numeric values if needed
        const data = {
            ...req.body,
            noForm,
            tanggal: new Date(req.body.tanggal),
        };

        if (req.body.targetSelesai) data.targetSelesai = new Date(req.body.targetSelesai);
        if (req.body.tanggalAktual) data.tanggalAktual = new Date(req.body.tanggalAktual);
        if (req.body.tanggalApproval) data.tanggalApproval = new Date(req.body.tanggalApproval);
        
        // Handle numeric fields from form-data
        if (data.ngRatioSebelum) data.ngRatioSebelum = parseFloat(data.ngRatioSebelum);
        if (data.ngRatioSesudah) data.ngRatioSesudah = parseFloat(data.ngRatioSesudah);
        if (data.impactTurun) data.impactTurun = parseFloat(data.impactTurun);
        if (data.nominalApresiasi) data.nominalApresiasi = parseFloat(data.nominalApresiasi);
        
        // Handle Images from multer
        if (req.files && req.files.fotoKondisi) {
            data.fotoKondisiUrls = await processUploadedFiles(req.files.fotoKondisi, `KONDISI-${noForm}`);
        } else if (req.body.fotoKondisiBase64) {
            // Fallback base64
            let b64 = req.body.fotoKondisiBase64;
            if (typeof b64 === 'string') b64 = JSON.parse(b64);
            data.fotoKondisiUrls = await processBase64Images(b64, `KONDISI-${noForm}`);
        }
        
        delete data.fotoKondisiBase64; 
        
        const newSuggestion = await prisma.improvementSuggestion.create({ data });
        res.status(StatusCodes.CREATED).json({ success: true, data: newSuggestion, message: 'Suggestion created successfully' });
    } catch (error) {
        next(error);
    }
};

export const getSuggestions = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const skip = (page - 1) * limit;

        const where = {};
        if (req.user.role === 'USER') {
            let nik = req.user.username;
            if (!nik) {
                // Fallback for old JWT tokens
                const userObj = await prisma.user.findUnique({ where: { id: req.user.userId } });
                nik = userObj?.username;
            }
            where.nik = nik || 'UNKNOWN'; 
        }

        // Search filter
        if (search.trim()) {
            where.OR = [
                { noForm: { contains: search.trim(), mode: 'insensitive' } },
                { namaKaryawan: { contains: search.trim(), mode: 'insensitive' } },
                { judulIde: { contains: search.trim(), mode: 'insensitive' } },
            ];
        }

        const [suggestions, total] = await Promise.all([
            prisma.improvementSuggestion.findMany({
                where,
                skip: parseInt(skip),
                take: parseInt(limit),
                orderBy: { createdAt: 'desc' },
            }),
            prisma.improvementSuggestion.count({ where }),
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
        
        // Handle numeric fields from form-data
        if (data.ngRatioSebelum) data.ngRatioSebelum = parseFloat(data.ngRatioSebelum);
        if (data.ngRatioSesudah) data.ngRatioSesudah = parseFloat(data.ngRatioSesudah);
        if (data.impactTurun) data.impactTurun = parseFloat(data.impactTurun);
        if (data.nominalApresiasi) data.nominalApresiasi = parseFloat(data.nominalApresiasi);
        
        // Parse existing URLs if sent as string from FormData
        if (typeof data.fotoKondisiUrls === 'string') {
            data.fotoKondisiUrls = JSON.parse(data.fotoKondisiUrls);
        }
        if (typeof data.fotoEvaluasiUrls === 'string') {
            data.fotoEvaluasiUrls = JSON.parse(data.fotoEvaluasiUrls);
        }

        // Handle Images from multer
        if (req.files && req.files.fotoKondisi) {
            const newUrls = await processUploadedFiles(req.files.fotoKondisi, `KONDISI-${id}`);
            data.fotoKondisiUrls = [...(data.fotoKondisiUrls || []), ...newUrls];
        } else if (req.body.fotoKondisiBase64) {
            let b64 = req.body.fotoKondisiBase64;
            if (typeof b64 === 'string') b64 = JSON.parse(b64);
            const newUrls = await processBase64Images(b64, `KONDISI-${id}`);
            data.fotoKondisiUrls = [...(data.fotoKondisiUrls || []), ...newUrls];
        }

        if (req.files && req.files.fotoEvaluasi) {
            const newUrls = await processUploadedFiles(req.files.fotoEvaluasi, `EVALUASI-${id}`);
            data.fotoEvaluasiUrls = [...(data.fotoEvaluasiUrls || []), ...newUrls];
        } else if (req.body.fotoEvaluasiBase64) {
            let b64 = req.body.fotoEvaluasiBase64;
            if (typeof b64 === 'string') b64 = JSON.parse(b64);
            const newUrls = await processBase64Images(b64, `EVALUASI-${id}`);
            data.fotoEvaluasiUrls = [...(data.fotoEvaluasiUrls || []), ...newUrls];
        }
        
        delete data.fotoKondisiBase64;
        delete data.fotoEvaluasiBase64;
        delete data.noForm; // Don't update noForm

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

export const getSuggestionAnalytics = async (req, res, next) => {
    try {
        // 1. KPI
        const total = await prisma.improvementSuggestion.count();
        const pending = await prisma.improvementSuggestion.count({ where: { statusApproval: 'PENDING' } });
        const approved = await prisma.improvementSuggestion.count({ where: { statusApproval: 'APPROVED' } });
        const rejected = await prisma.improvementSuggestion.count({ where: { statusApproval: 'REJECTED' } });
        const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;
        
        // Total Apresiasi via Aggregation
        const aggApresiasi = await prisma.improvementSuggestion.aggregate({
            _sum: { nominalApresiasi: true },
            where: { statusApproval: 'APPROVED' }
        });
        const totalApresiasi = aggApresiasi._sum.nominalApresiasi || 0;

        // 2. Status Data
        const statusData = [
            { name: 'Pending', value: pending, fill: '#F59E0B' },
            { name: 'Approved', value: approved, fill: '#10B981' },
            { name: 'Rejected', value: rejected, fill: '#EF4444' }
        ].filter(i => i.value > 0);

        // 3. Departemen Data
        const deptGroup = await prisma.improvementSuggestion.groupBy({
            by: ['departemen'],
            _count: { id: true },
            orderBy: { _count: { id: 'desc' } },
            take: 10
        });
        const deptData = deptGroup.map(d => ({ departemen: d.departemen || 'Unknown', total: d._count.id }));

        // 4. Area Proses Data
        const areaGroup = await prisma.improvementSuggestion.groupBy({
            by: ['areaProses'],
            _count: { id: true },
            orderBy: { _count: { id: 'desc' } },
            take: 10
        });
        const areaData = areaGroup.map(d => ({ area: d.areaProses || 'Unknown', total: d._count.id }));

        // 5. Focus Defect
        const defectGroup = await prisma.improvementSuggestion.groupBy({
            by: ['focusDefect'],
            _count: { id: true },
            orderBy: { _count: { id: 'desc' } }
        });
        const defectData = defectGroup.map(d => ({ name: d.focusDefect || 'Lainnya', value: d._count.id }));

        // 6. Top Submitters
        const topSubmittersRaw = await prisma.$queryRaw`
            SELECT 
                "namaKaryawan" as name, 
                "departemen" as dept, 
                COUNT(id) as total
            FROM improvement_suggestions
            GROUP BY "namaKaryawan", "departemen"
            ORDER BY total DESC
            LIMIT 5
        `;
        const topSubmitters = topSubmittersRaw.map(d => ({
            name: d.name,
            dept: d.dept,
            total: Number(d.total)
        }));

        // 7. Apresiasi Data
        const apresiasiGroup = await prisma.improvementSuggestion.groupBy({
            by: ['kategoriApresiasi'],
            _count: { id: true },
            where: { statusApproval: 'APPROVED', kategoriApresiasi: { not: null } },
            orderBy: { _count: { id: 'desc' } }
        });
        const APRESIASI_COLORS = { 'Gold': '#F59E0B', 'Silver': '#94A3B8', 'Bronze': '#B45309', 'Platinum': '#818CF8' };
        const apresiasiData = apresiasiGroup.filter(d => d.kategoriApresiasi).map(d => ({
            name: d.kategoriApresiasi,
            value: d._count.id,
            fill: APRESIASI_COLORS[d.kategoriApresiasi] || '#6366F1'
        }));

        // 8. Pending Lama (> 30 Hari)
        const date30DaysAgo = new Date();
        date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);
        
        const pendingLamaRaw = await prisma.improvementSuggestion.findMany({
            where: { 
                statusApproval: 'PENDING',
                tanggal: { lt: date30DaysAgo }
            },
            orderBy: { tanggal: 'asc' }
        });
        
        const pendingLama = pendingLamaRaw.map(d => {
            const diffTime = Math.abs(new Date() - new Date(d.tanggal));
            const aging = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return {
                id: d.id,
                noForm: d.noForm,
                judulIde: d.judulIde,
                namaKaryawan: d.namaKaryawan,
                departemen: d.departemen,
                aging
            };
        });

        // 9a. Trend Data - Daily (for Mingguan and Bulanan)
        const trendDailyRaw = await prisma.$queryRaw`
            SELECT 
                TO_CHAR(tanggal, 'YYYY-MM-DD') as day_key,
                COUNT(id)::int as count
            FROM improvement_suggestions
            WHERE tanggal >= CURRENT_DATE - INTERVAL '30 days'
            GROUP BY TO_CHAR(tanggal, 'YYYY-MM-DD')
        `;

        // 9b. Trend Data - Monthly (for Tahunan)
        const trendMonthlyRaw = await prisma.$queryRaw`
            SELECT 
                TO_CHAR(tanggal, 'YYYY-MM') as month_key,
                COUNT(id)::int as count
            FROM improvement_suggestions
            WHERE tanggal >= DATE_TRUNC('month', NOW() - INTERVAL '11 months')
            GROUP BY TO_CHAR(tanggal, 'YYYY-MM')
        `;

        const today = new Date();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];

        const trendMingguan = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            const displayDate = `${d.getDate()} ${monthNames[d.getMonth()]}`;
            const match = trendDailyRaw.find(r => r.day_key === key);
            trendMingguan.push({ date: displayDate, count: match ? Number(match.count) : 0 });
        }

        const trendBulanan = [];
        for (let i = 29; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            const displayDate = `${d.getDate()} ${monthNames[d.getMonth()]}`;
            const match = trendDailyRaw.find(r => r.day_key === key);
            trendBulanan.push({ date: displayDate, count: match ? Number(match.count) : 0 });
        }
        
        const trendTahunan = [];
        for (let i = 11; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            const displayDate = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
            
            const match = trendMonthlyRaw.find(r => r.month_key === key);
            trendTahunan.push({ date: displayDate, count: match ? Number(match.count) : 0 });
        }

        const trendData = {
            Mingguan: trendMingguan,
            Bulanan: trendBulanan,
            Tahunan: trendTahunan
        };

        res.json({
            success: true,
            data: {
                kpi: { total, pending, approved, rejected, approvalRate, totalApresiasi },
                statusData,
                deptData,
                areaData,
                defectData,
                topSubmitters,
                apresiasiData,
                pendingLama,
                trendData
            }
        });
    } catch (error) {
        next(error);
    }
};
