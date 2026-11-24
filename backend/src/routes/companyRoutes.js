import express from 'express';
import { prisma, prismaHrm } from '../services/prismaService.js';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

// Get the main active company for reports
router.get('/active', async (req, res) => {
    try {
        // 1. Check HRM company table first
        const hrmCompany = await prismaHrm.company.findFirst({
            orderBy: { id: 'asc' }
        }).catch(() => null);

        if (hrmCompany && hrmCompany.COMPANY) {
            return res.status(StatusCodes.OK).json({
                success: true,
                data: {
                    name: hrmCompany.COMPANY,
                    address: [hrmCompany.ADDRESS1, hrmCompany.ADDRESS2, hrmCompany.ADDRESS3].filter(Boolean).join(' '),
                    phone: hrmCompany.TLP ? hrmCompany.TLP.trim() : '',
                    email: hrmCompany.EMAIL ? hrmCompany.EMAIL.trim() : '',
                    website: hrmCompany.HOMEPAGE ? hrmCompany.HOMEPAGE.trim() : '',
                    logo: hrmCompany.LOGO || '/logo-md.png'
                }
            });
        }

        // 2. Check GIS Company table
        const gisCompany = await prisma.company.findFirst({
            where: { isActive: true },
            orderBy: { id: 'asc' }
        }).catch(() => null);

        if (gisCompany) {
            return res.status(StatusCodes.OK).json({
                success: true,
                data: {
                    name: gisCompany.name,
                    address: gisCompany.address || '',
                    phone: gisCompany.phone || '',
                    email: gisCompany.email || '',
                    website: gisCompany.website || '',
                    logo: gisCompany.logo || '/logo-md.png'
                }
            });
        }

        // 3. Fallback default company
        return res.status(StatusCodes.OK).json({
            success: true,
            data: {
                name: 'PT. GRAFINDO MITRASEMESTA',
                address: 'Cikarang Industrial Estate Jababeka 1 Block U 8D, U 8C & U 7A, Cikarang Utara, Bekasi Regency, West Java 17530',
                phone: '(021) 8934714',
                email: 'info@grafindo.co.id',
                website: 'www.grafindo.co.id',
                logo: '/logo-md.png'
            }
        });
    } catch (error) {
        console.error('Error fetching company:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Server error'
        });
    }
});

export default router;
