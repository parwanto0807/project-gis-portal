
import { prismaHrm } from './src/services/prismaService.js';

async function comparePaidUnpaid() {
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
  const paidIds = (await prismaHrm.gaji.findMany({
    where: { PERIOD: period },
    select: { EMPL_ID: true }
  })).map(e => e.EMPL_ID);
  
  const allAktif = await prismaHrm.karyawan.findMany({
    where: { KD_STS: 'AKTIF' },
    select: { EMPL_ID: true, KD_JNS: true, TGL_OUT: true, KD_OUT: true }
  });
  
  const paidAktif = allAktif.filter(e => paidIds.includes(e.EMPL_ID));
  const unpaidAktif = allAktif.filter(e => !paidIds.includes(e.EMPL_ID));
  
  console.log(`Total AKTIF: ${allAktif.length}`);
  console.log(`Paid AKTIF: ${paidAktif.length}`);
  console.log(`Unpaid AKTIF: ${unpaidAktif.length}`);
  
  console.log('Unpaid AKTIF Sample:', JSON.stringify(unpaidAktif.slice(0, 5), null, 2));
  
  process.exit(0);
}

comparePaidUnpaid();
