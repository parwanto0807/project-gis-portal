
import { prismaHrm } from './src/services/prismaService.js';

async function checkUnpaidKdOut() {
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
    where: { 
        AND: [
            { KD_STS: 'AKTIF' },
            { NOT: { EMPL_ID: { in: paidIds } } }
        ]
    },
    _count: { _all: true }
  });

  console.log('KD_OUT stats of UNPAID (but marked AKTIF) employees:');
  console.log(JSON.stringify(stats, null, 2));

  process.exit(0);
}

checkUnpaidKdOut();
