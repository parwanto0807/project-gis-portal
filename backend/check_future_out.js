
import { prismaHrm } from './src/services/prismaService.js';

async function checkFutureOut() {
  try {
    const now = new Date();
    const futureOut = await prismaHrm.karyawan.count({
      where: { 
        TGL_OUT: { gt: now }
      }
    });

    const pastOut = await prismaHrm.karyawan.count({
      where: { 
        TGL_OUT: { lte: now }
      }
    });

    console.log(`Future TGL_OUT: ${futureOut}`);
    console.log(`Past TGL_OUT: ${pastOut}`);

    if (futureOut > 0) {
        const sample = await prismaHrm.karyawan.findFirst({
            where: { TGL_OUT: { gt: now } },
            select: { NAMA: true, TGL_OUT: true, KD_STS: true }
        });
        console.log('Sample Future TGL_OUT:', sample);
    }

  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

checkFutureOut();
