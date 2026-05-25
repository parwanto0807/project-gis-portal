
import { prismaHrm } from './src/services/prismaService.js';

async function checkRecentOut() {
  const people = await prismaHrm.karyawan.findMany({
    where: { 
        AND: [
            { NOT: { TGL_OUT: null } },
            { TGL_OUT: { gt: new Date('2024-01-01') } }
        ]
    },
    select: { NAMA: true, TGL_OUT: true, KD_STS: true }
  });
  
  console.log(`Employees with TGL_OUT after 2024: ${people.length}`);
  console.log('Sample:', JSON.stringify(people, null, 2));
  process.exit(0);
}

checkRecentOut();
