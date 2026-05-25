
import { prismaHrm } from './src/services/prismaService.js';

async function countTrueActive() {
  try {
    const active = await prismaHrm.karyawan.count({
      where: { 
        AND: [
            { KD_STS: 'AKTIF' },
            { KD_OUT: false },
            { TGL_OUT: null }
        ]
      }
    });

    const total = await prismaHrm.karyawan.count();

    console.log(`True Active (AKTIF, KD_OUT=false, TGL_OUT=null): ${active}`);
    console.log(`Total Records: ${total}`);

  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

countTrueActive();
