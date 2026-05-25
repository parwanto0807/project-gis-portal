
import { prismaHrm } from './src/services/prismaService.js';

async function checkKdOutLogic() {
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

  const stats = await prismaHrm.karyawan.groupBy({
    by: ['KD_OUT'],
    where: { EMPL_ID: { in: paidIds } },
    _count: { _all: true }
  });

  console.log(`Latest Period: ${period}`);
  console.log('KD_OUT stats of PAID employees:');
  console.log(JSON.stringify(stats, null, 2));

  process.exit(0);
}

checkKdOutLogic();
