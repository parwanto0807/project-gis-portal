import prisma from '../config/prisma.js';
import { StatusCodes } from 'http-status-codes';

export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, role } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (role) {
      where.role = role;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          role: true,
          status: true,
          createdAt: true,
          lastLoginAt: true,
          picture: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: users,
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

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        permissions: true,
        companies: {
            include: { company: true }
        }
      },
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    // Remove password just in case
    delete user.password;

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUserPermissions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, permissions, status } = req.body; 
    // permissions: [{ module: 'INVENTORY', actions: ['READ', 'CREATE'] }]

    // Transaction implementation for atomicity
    const updatedUser = await prisma.$transaction(async (tx) => {
      // 1. Update basic info
      const user = await tx.user.update({
        where: { id: parseInt(id) },
        data: { 
            role, 
            status 
        },
      });

      // 2. Handle Permissions
      if (permissions) {
        // Delete existing
        await tx.permission.deleteMany({
            where: { userId: parseInt(id) }
        });

        // Insert new
        if (permissions.length > 0) {
            await tx.permission.createMany({
                data: permissions.map(p => ({
                    userId: parseInt(id),
                    module: p.module,
                    actions: p.actions
                }))
            });
        }
      }
      
      return user;
    });

    res.json({ success: true, data: updatedUser, message: 'User permissions updated' });

  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({ where: { id: parseInt(id) } });
        res.json({ success: true, message: 'User deleted' });
    } catch (error) {
        next(error);
    }
}
