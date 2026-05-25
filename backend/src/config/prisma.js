import prismaClientPackage from '../generated/client/index.js';

const { PrismaClient } = prismaClientPackage;

// Prevent multiple instances in development
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
