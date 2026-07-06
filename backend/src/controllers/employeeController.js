import { StatusCodes } from 'http-status-codes';
import { prismaHrm } from '../services/prismaService.js';

/**
 * Get all employees with pagination and secure field selection
 * @route GET /api/v1/employees
 * @access Private/Admin/HR
 */
export const getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    // Build the query where clause
    const where = search ? {
      OR: [
        { NAMA: { contains: search, mode: 'insensitive' } },
        { EMPL_ID: { contains: search, mode: 'insensitive' } },
        { NIK: { contains: search, mode: 'insensitive' } }
      ]
    } : {};

    // Only select fields safe for the HR/Admin view
    const select = {
      id: true,
      EMPL_ID: true,
      NIK: true,
      NAMA: true,
      KD_CMPY: true,
      KD_DEPT: true,
      KD_BAG: true,
      KD_JAB: true,
      KD_STS: true,
      KD_JNS: true,
      KD_SEX: true,
      TGL_MSK: true,
      EMAIL: true,
      HANDPHONE: true,
      company: {
        select: {
          COMPANY: true
        }
      },
      mstdept: {
        select: {
          CNM_DEPT: true
        }
      },
      mstbag: {
        select: {
          CNM_BAG: true
        }
      },
      mstjab: {
        select: {
          CNM_JAB: true
        }
      }
    };

    const [employees, total] = await Promise.all([
      prismaHrm.karyawan.findMany({
        where,
        skip,
        take: limit,
        select,
        orderBy: { NAMA: 'asc' }
      }),
      prismaHrm.karyawan.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(StatusCodes.OK).json({
      success: true,
      data: employees,
      pagination: {
        total,
        page,
        limit,
        totalPages
      }
    });
  } catch (error) {
    console.error('Error in getAllEmployees:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to retrieve employees',
      error: error.message
    });
  }
};
