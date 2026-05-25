
import { prismaHrm } from './src/services/prismaService.js';

async function checkActivePool() {
  try {
    const physicallyActive = await prismaHrm.karyawan.findMany({
        where: {
            AND: [
                { TGL_OUT: null },
                { KD_OUT: false }
            ]
        },
        select: { KD_STS: true }
    });

    const stats = physicallyActive.reduce((acc, curr) => {
        acc[curr.KD_STS] = (acc[curr.KD_STS] || 0) + 1;
        return acc;
    }, {});

    console.log('Physically Active (NO TGL_OUT, NO KD_OUT) KD_STS Distribution:');
    console.log(JSON.stringify(stats, null, 2));

  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

checkActivePool();
