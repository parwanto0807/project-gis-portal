import express from 'express';
import { prismaHrm } from '../services/prismaService.js';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

// Get the main active company for reports
router.get('/active', async (req, res) => {
    try {
        const company = await prismaHrm.company.findFirst({
            orderBy: { id: 'asc' }
        });

        if (!company) {
            // Fallback default company if database lacks records
            return res.status(StatusCodes.OK).json({
                success: true,
                data: {
                    name: 'PT Internal Corporate System',
                    address: 'Standard Tech Address, Floor 5',
                    phone: '+62 800 1234 567',
                    email: 'admin@corporate.id',
                    website: 'www.corporate.id'
                }
            });
        }

        res.status(StatusCodes.OK).json({
            success: true,
            data: {
                name: company.COMPANY || 'Company Name Not Set',
                address: [company.ADDRESS1, company.ADDRESS2, company.ADDRESS3].filter(Boolean).join(' '),
                phone: company.TLP ? company.TLP.trim() : '',
                email: company.EMAIL ? company.EMAIL.trim() : '',
                website: company.HOMEPAGE ? company.HOMEPAGE.trim() : ''
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
