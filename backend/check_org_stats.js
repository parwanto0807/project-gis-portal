
import { prismaHrm } from './src/services/prismaService.js';

async function checkOrgStats() {
  const latestSalary = await prismaHrm.gaji.findMany({
    orderBy: { PERIOD: 'desc' },
    take: 1,
    select: { PERIOD: true }
  });
  
  const period = latestSalary[0].PERIOD;
  const paidIds = (await prismaHrm.gaji.findMany({
    where: { PERIOD: period },
    select: { EMPL_ID: true }
  })).map(e => e.EMPL_ID);
  
  const paidStats = await prismaHrm.karyawan.groupBy({
    by: ['KD_CMPY', 'KD_FACT'],
    where: { EMPL_ID: { in: paidIds } },
    _count: { _all: true }
  });
  
  const allAktifStats = await prismaHrm.karyawan.groupBy({
    by: ['KD_CMPY', 'KD_FACT'],
    where: { KD_STS: 'AKTIF' },
    _count: { _all: true }
  });
  
  console.log('Stats of PAID employees (last period):');
  console.log(JSON.stringify(paidStats, null, 2));
  
  console.log('\nStats of all AKTIF employees:');
  console.log(JSON.stringify(allAktifStats, null, 2));
  
  process.exit(0);
}

checkOrgStats();
