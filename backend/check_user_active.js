
import { prismaHrm } from './src/services/prismaService.js';

async function checkUserIsActive() {
  try {
    const activeUsers = await prismaHrm.user.count({ where: { isActive: true } });
    const inactiveUsers = await prismaHrm.user.count({ where: { isActive: false } });
    
    console.log('User model isActive stats:');
    console.log(`Active: ${activeUsers}`);
    console.log(`Inactive: ${inactiveUsers}`);

    const sample = await prismaHrm.user.findFirst({
        where: { isActive: false },
        include: { karyawan: { select: { NAMA: true, KD_STS: true } } }
    });
    console.log('Sample Inactive User:', JSON.stringify(sample, null, 2));

  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

checkUserIsActive();
