import { StatusCodes } from 'http-status-codes';
import prisma from '../config/prisma.js';

export const getAllLogs = async (req, res, next) => {
    try {
        const { page = 1, limit = 50, module } = req.query;
        const skip = (page - 1) * limit;

        const where = {};
        if (module) {
            where.module = module;
        }

        const logs = await prisma.userLog.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        username: true,
                        email: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            skip: parseInt(skip),
            take: parseInt(limit)
        });

        const totalLogs = await prisma.userLog.count({ where });

        res.status(StatusCodes.OK).json({
            success: true,
            data: logs,
            pagination: {
                total: totalLogs,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(totalLogs / limit)
            }
        });
    } catch (error) {
        console.error("Error fetching user logs:", error);
        next(error);
    }
};
