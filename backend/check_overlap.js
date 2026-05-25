
import { prismaHrm } from './src/services/prismaService.js';

async function checkOverlap() {
  const recentAttendanceIds = (await prismaHrm.absent.findMany({
    where: { TGL_ABSEN: { gt: new Date('2024-01-01') } },
    distinct: ['EMPL_ID'],
    select: { EMPL_ID: true }
  })).map(e => e.EMPL_ID);
  
  const inStsAktif = await prismaHrm.karyawan.count({
    where: { 
        AND: [
            { EMPL_ID: { in: recentAttendanceIds } },
            { KD_STS: 'AKTIF' }
        ]
    }
  });

  const inStsTidakAktif = await prismaHrm.karyawan.count({
    where: { 
        AND: [
            { EMPL_ID: { in: recentAttendanceIds } },
            { KD_STS: 'TIDAK_AKTIF' }
        ]
    }
  });
  
  console.log(`Recent attendance in AKTIF: ${inStsAktif}`);
  console.log(`Recent attendance in TIDAK_AKTIF: ${inStsTidakAktif}`);
  
  process.exit(0);
}

checkOverlap();
