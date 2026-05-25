
import { prismaHrm } from './src/services/prismaService.js';

async function checkDateOut() {
  try {
    const hasDateOut = await prismaHrm.karyawan.count({
      where: { NOT: { TGL_OUT: null } }
    });
    
    const hasKdOut = await prismaHrm.karyawan.count({
      where: { KD_OUT: true }
    });
    
    const both = await prismaHrm.karyawan.count({
      where: { 
        AND: [
            { NOT: { TGL_OUT: null } },
            { KD_OUT: true }
        ]
      }
    });

    console.log(`Has TGL_OUT: ${hasDateOut}`);
    console.log(`Has KD_OUT=true: ${hasKdOut}`);
    console.log(`Both: ${both}`);
    
    const sampleOut = await prismaHrm.karyawan.findMany({
        where: { KD_OUT: true },
        select: { NAMA: true, KD_STS: true, TGL_OUT: true },
        take: 5
    });
    console.log('Sample KD_OUT=true:', JSON.stringify(sampleOut, null, 2));

  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

checkDateOut();
