
import { prismaHrm } from './src/services/prismaService.js';

async function checkFinalCount() {
  const activeCount = await prismaHrm.karyawan.count({
    where: {
        AND: [
            { KD_STS: 'AKTIF' },
            { KD_OUT: false },
            { TGL_OUT: null },
            { ALASAN_OUT: null }
        ]
    }
  });
  console.log('TRUE_ACTIVE_COUNT:', activeCount);
  process.exit(0);
}

checkFinalCount();
