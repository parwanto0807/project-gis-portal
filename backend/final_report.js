
import { prismaHrm } from './src/services/prismaService.js';

async function finalReport() {
  try {
    const total = await prismaHrm.karyawan.count();
    
    const aktifSTS = await prismaHrm.karyawan.count({ where: { KD_STS: 'AKTIF' } });
    const tglOutSet = await prismaHrm.karyawan.count({ where: { NOT: { TGL_OUT: null } } });
    const kdOutTrue = await prismaHrm.karyawan.count({ where: { KD_OUT: true } });
    
    const trueActive = await prismaHrm.karyawan.count({
        where: {
            AND: [
                { KD_STS: 'AKTIF' },
                { KD_OUT: false },
                { TGL_OUT: null }
            ]
        }
    });

    const onlySTS = await prismaHrm.karyawan.count({
        where: {
            AND: [
                { KD_STS: 'AKTIF' },
                { OR: [ { NOT: { TGL_OUT: null } }, { KD_OUT: true } ] }
            ]
        }
    });

    console.log('TOTAL_RECORDS:', total);
    console.log('KD_STS_AKTIF:', aktifSTS);
    console.log('TGL_OUT_SET:', tglOutSet);
    console.log('KD_OUT_TRUE:', kdOutTrue);
    console.log('TRUE_ACTIVE (AKTIF+NO_OUT+NO_TGL):', trueActive);
    console.log('MISLEADING_ACTIVE (AKTIF but has OUT):', onlySTS);

  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

finalReport();
