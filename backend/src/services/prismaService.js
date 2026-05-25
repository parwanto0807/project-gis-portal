import gisClientPackage from '../generated/client/index.js';
import hrmClientPackage from '../generated/hrm/index.js';

const { PrismaClient: GISClient } = gisClientPackage;
const { PrismaClient: HRMClient } = hrmClientPackage;

const prisma = new GISClient();
const prismaHrm = new HRMClient();

export { prisma, prismaHrm };
