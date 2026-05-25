
import { prismaHrm } from './src/services/prismaService.js';

async function checkNewLogic() {
  const activeCondition = {
    AND: [
      { KD_STS: 'AKTIF' },
      { KD_OUT: false },
      { TGL_OUT: null }
    ]
  };

  const inactiveCondition = {
    OR: [
      { KD_STS: 'TIDAK_AKTIF' },
      { KD_OUT: true },
      { NOT: { TGL_OUT: null } }
    ]
  };

  const activeCount = await prismaHrm.karyawan.count({ where: activeCondition });
  const inactiveCount = await prismaHrm.karyawan.count({ where: inactiveCondition });
  
  console.log('--- NEW LOGIC STATS ---');
  console.log(`Active: ${activeCount}`);
  console.log(`Inactive: ${inactiveCount}`);
  console.log(`Total: ${activeCount + inactiveCount}`);
  
  process.exit(0);
}

checkNewLogic();
