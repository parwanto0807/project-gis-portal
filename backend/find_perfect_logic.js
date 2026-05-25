
import { prismaHrm } from './src/services/prismaService.js';

async function findPerfectLogic() {
  const latestSalary = await prismaHrm.gaji.findMany({
    orderBy: { PERIOD: 'desc' },
    take: 1,
    select: { PERIOD: true }
  });
  
  if (latestSalary.length === 0) {
    console.log('No salary records');
    process.exit(0);
  }
  
  const period = latestSalary[0].PERIOD;
  const activeEmpIds = (await prismaHrm.gaji.findMany({
    where: { PERIOD: period },
    select: { EMPL_ID: true }
  })).map(e => e.EMPL_ID);
  
  const activeKaryawan = await prismaHrm.karyawan.findMany({
    where: { EMPL_ID: { in: activeEmpIds } },
    select: { KD_STS: true, KD_OUT: true, TGL_OUT: true }
  });
  
  const stats = activeKaryawan.reduce((acc, curr) => {
    const key = `sts:${curr.KD_STS}|out:${curr.KD_OUT}|tgl:${!!curr.TGL_OUT}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  
  console.log(`Latest Period: ${period}`);
  console.log('Stats of employees who received salary:');
  console.log(JSON.stringify(stats, null, 2));
  
  process.exit(0);
}

findPerfectLogic();
