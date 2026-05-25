
import { prisma } from './src/services/prismaService.js';
import { prismaHrm } from './src/services/prismaService.js';

async function checkUserRole() {
  const email = 'parwanto0807@gmail.com';
  
  const portalUser = await prisma.user.findUnique({
    where: { email },
    select: { email: true, role: true }
  });
  
  const hrmUser = await prismaHrm.user.findUnique({
    where: { email },
    select: { email: true, role: true }
  });

  console.log('--- USER ROLE CHECK ---');
  console.log('Portal DB User:', JSON.stringify(portalUser, null, 2));
  console.log('HRM DB User:', JSON.stringify(hrmUser, null, 2));
  
  process.exit(0);
}

checkUserRole();
