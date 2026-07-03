import prisma from '../config/prisma.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';

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
        orderBy: [
          { lastLoginAt: { sort: 'desc', nulls: 'last' } },
          { createdAt: 'desc' }
        ],
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
      const updateData = {};
      if (role) updateData.role = role;
      if (status) updateData.status = status;

      const user = await tx.user.update({
        where: { id: parseInt(id) },
        data: updateData,
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
    console.error("PERMISSION UPDATE ERROR:", error);
    import('fs').then(fs => fs.writeFileSync('permission_error.txt', String(error.message) + '\\n' + String(error.stack)));
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

export const updateUserDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    
    const updateData = {};
    if (username) {
      // Check if username is already taken by another user
      const existingUser = await prisma.user.findFirst({
        where: { username, id: { not: parseInt(id) } }
      });
      if (existingUser) {
        return res.status(StatusCodes.CONFLICT).json({ success: false, message: 'Username is already taken' });
      }
      updateData.username = username;
    }
    
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    if (Object.keys(updateData).length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'No data provided to update' });
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
      }
    });
    
    res.json({ success: true, data: updatedUser, message: 'User details updated successfully' });
  } catch (error) {
    next(error);
  }
};
