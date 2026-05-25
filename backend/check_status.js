
import { prismaHrm } from './src/services/prismaService.js';

async function checkStatus() {
  try {
    const stsStats = await prismaHrm.karyawan.groupBy({
      by: ['KD_STS'],
      _count: { _all: true }
    });
    
    const outStats = await prismaHrm.karyawan.groupBy({
      by: ['KD_OUT'],
      _count: { _all: true }
    });
    
    const combinedStats = await prismaHrm.karyawan.groupBy({
      by: ['KD_STS', 'KD_OUT'],
      _count: { _all: true }
    });

    console.log('--- KD_STS Stats ---');
    console.log(JSON.stringify(stsStats, null, 2));
    
    console.log('\n--- KD_OUT Stats ---');
    console.log(JSON.stringify(outStats, null, 2));
    
    console.log('\n--- Combined Stats ---');
    console.log(JSON.stringify(combinedStats, null, 2));

  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

checkStatus();
