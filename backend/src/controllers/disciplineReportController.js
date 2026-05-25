import { prisma, prismaHrm } from '../services/prismaService.js';
import { StatusCodes } from 'http-status-codes';

export const getHrmEmployees = async (req, res) => {
  try {
    const { search } = req.query;

    // Fetch from hrm_system.karyawan
    const employees = await prismaHrm.karyawan.findMany({
      where: { 
          ...(search ? {
              OR: [
                  { NAMA: { contains: search, mode: 'insensitive' } },
                  { EMPL_ID: { contains: search, mode: 'insensitive' } },
                  { NIK: { contains: search, mode: 'insensitive' } }
              ]
          } : {})
      }, 
      select: {
          EMPL_ID: true,
          NIK: true,
          NAMA: true,
          KD_JAB: true,
          KD_DEPT: true,
          KD_STS: true
      },
      take: 200, 
      orderBy: { NAMA: 'asc' }
    });

    res.status(StatusCodes.OK).json({ 
        success: true, 
        data: employees 
    });
  } catch (error) {
    console.error('getHrmEmployees Error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        success: false, 
        message: 'Failed to fetch employees from HRM system' 
    });
  }
};

export const getEmployeesMaster = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { search, status } = req.query;

    // Define true status conditions based on database semantics:
    // Research shows KD_OUT=true correlates exactly with currently paid employees (227 total).
    // Employees marked as AKTIF but KD_OUT=false are historical records not receiving salary (190 total).
    const activeCondition = {
      AND: [
        { KD_STS: 'AKTIF' },
        { KD_OUT: true }
      ]
    };

    const inactiveCondition = {
      OR: [
        { KD_STS: 'TIDAK_AKTIF' },
        { KD_OUT: false }
      ]
    };

    const whereClause = {
      AND: [
        search ? {
          OR: [
            { NAMA: { contains: search, mode: 'insensitive' } },
            { EMPL_ID: { contains: search, mode: 'insensitive' } },
            { NIK: { contains: search, mode: 'insensitive' } },
            { mstdept: { CNM_DEPT: { contains: search, mode: 'insensitive' } } }
          ]
        } : {},
        status ? (status === 'AKTIF' ? activeCondition : (status === 'TIDAK_AKTIF' ? inactiveCondition : {})) : {}
      ]
    };

    // Parallel queries for better performance
    const [employees, totalCount, activeCount, inactiveCount, deptStats] = await Promise.all([
      prismaHrm.karyawan.findMany({
        where: whereClause,
        include: {
          mstdept: { select: { CNM_DEPT: true } },
          mstjab: { select: { CNM_JAB: true } }
        },
        skip,
        take: limit,
        orderBy: { NAMA: 'asc' }
      }),
      prismaHrm.karyawan.count({ where: whereClause }),
      prismaHrm.karyawan.count({ where: activeCondition }),
      prismaHrm.karyawan.count({ where: inactiveCondition }),
      prismaHrm.mstdept.findMany({
        select: {
          CNM_DEPT: true,
          _count: {
            select: { karyawan: { where: activeCondition } }
          }
        },
        where: {
          karyawan: { some: {} }
        },
        orderBy: {
          karyawan: { _count: 'desc' }
        },
        take: 12 // Top 12 departments
      })
    ]);

    // Format stats for frontend
    const stats = {
      total: activeCount + inactiveCount,
      active: activeCount,
      inactive: inactiveCount
    };

    // Add a computed status to each employee for frontend
    const formattedEmployees = employees.map(emp => {
      const isActuallyActive = emp.KD_STS === 'AKTIF' && emp.KD_OUT === true;
      return {
        ...emp,
        KD_STS: isActuallyActive ? 'AKTIF' : 'TIDAK_AKTIF'
      };
    });

    const formattedDeptStats = deptStats.map(d => ({
      name: d.CNM_DEPT || 'Unknown',
      count: d._count.karyawan
    }));

    res.status(StatusCodes.OK).json({
      success: true,
      data: formattedEmployees,
      pagination: {
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        pageSize: limit
      },
      stats,
      deptStats: formattedDeptStats
    });
  } catch (error) {
    console.error('getEmployeesMaster Error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch employee master data'
    });
  }
};

export const createReport = async (req, res) => {
  try {
    const { targetEmployeeId, employeeName, type, description, location } = req.body;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const reporterId = req.user.userId;

    const report = await prisma.disciplineReport.create({
      data: {
        reporterId,
        targetEmployeeId,
        employeeName,
        type,
        description,
        location,
        photoUrl
      }
    });

    res.status(StatusCodes.CREATED).json({ 
        success: true, 
        data: report 
    });
  } catch (error) {
    console.error('createReport Error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        success: false, 
        message: 'Failed to create discipline report' 
    });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await prisma.disciplineReport.findMany({
      include: {
        reporter: {
          select: { firstName: true, lastName: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(StatusCodes.OK).json({ 
        success: true, 
        data: reports 
    });
  } catch (error) {
    console.error('getReports Error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        success: false, 
        message: 'Failed to fetch reports' 
    });
  }
};

export const resolveReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { actionTaken, improvementPlan, resolutionSummary, actionDate } = req.body;
    const resolutionPhotoUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const handledById = req.user.userId;

    const report = await prisma.disciplineReport.update({
      where: { id: parseInt(id) },
      data: {
        status: 'RESOLVED',
        actionTaken,
        improvementPlan,
        resolutionSummary,
        resolutionPhotoUrl,
        actionDate: actionDate ? new Date(actionDate) : new Date(),
        handledById,
        handledAt: new Date()
      },
      include: {
        reporter: {
          select: { firstName: true, lastName: true, email: true }
        },
        handledBy: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    res.status(StatusCodes.OK).json({ 
        success: true, 
        data: report 
    });
  } catch (error) {
    console.error('resolveReport Error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        success: false, 
        message: 'Failed to resolve report' 
    });
  }
};
