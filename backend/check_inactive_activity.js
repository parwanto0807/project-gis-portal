
import { prismaHrm } from './src/services/prismaService.js';

async function checkInactiveWithActivity() {
  const inactiveEmployees = await prismaHrm.karyawan.findMany({
    where: { KD_STS: 'TIDAK_AKTIF' },
    select: { EMPL_ID: true }
  });
  
  const ids = inactiveEmployees.map(e => e.EMPL_ID);
  
  const recentAttendance = await prismaHrm.absent.findMany({
    where: {
        AND: [
            { EMPL_ID: { in: ids } },
            { TGL_ABSEN: { gt: new Date('2024-01-01') } }
        ]
    },
    take: 5,
    select: { EMPL_ID: true, TGL_ABSEN: true }
  });
  
  console.log(`Inactive employees with attendance after 2024: ${recentAttendance.length}`);
  console.log('Sample:', JSON.stringify(recentAttendance, null, 2));
  process.exit(0);
}

checkInactiveWithActivity();
