
import { prismaHrm } from './src/services/prismaService.js';

async function countResigned() {
  try {
    const resigned = await prismaHrm.karyawan.count({
      where: { 
        OR: [
            { NOT: { TGL_OUT: null } },
            { KD_OUT: true }
        ]
      }
    });

    const active = await prismaHrm.karyawan.count({
        where: {
            AND: [
                { TGL_OUT: null },
                { KD_OUT: false }
            ]
        }
    });

    console.log(`Resigned (TGL_OUT set OR KD_OUT=true): ${resigned}`);
    console.log(`Physically Active (TGL_OUT null AND KD_OUT=false): ${active}`);

  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

countResigned();
