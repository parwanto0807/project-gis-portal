
import { prismaHrm } from './src/services/prismaService.js';

async function finalCheck() {
  try {
    const case1 = await prismaHrm.karyawan.count({
      where: { 
        AND: [
            { NOT: { TGL_OUT: null } },
            { KD_STS: 'AKTIF' }
        ]
      }
    });
    
    const case2 = await prismaHrm.karyawan.count({
      where: { 
        AND: [
            { KD_OUT: true },
            { KD_STS: 'AKTIF' }
        ]
      }
    });

    console.log(`AKTIF but has TGL_OUT: ${case1}`);
    console.log(`AKTIF but KD_OUT=true: ${case2}`);

    const hasTglOutSample = await prismaHrm.karyawan.findFirst({
        where: { NOT: { TGL_OUT: null } },
        select: { NAMA: true, KD_STS: true, KD_OUT: true, TGL_OUT: true }
    });
    console.log('Sample TGL_OUT:', hasTglOutSample);

  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

finalCheck();
