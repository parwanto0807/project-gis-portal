
import { prismaHrm } from './src/services/prismaService.js';

async function checkPerson() {
  const p = await prismaHrm.karyawan.findFirst({
    where: { EMPL_ID: '000000190' },
    select: { NAMA: true, KD_STS: true, KD_OUT: true, TGL_OUT: true }
  });
  console.log('PERSON 000000190:', JSON.stringify(p, null, 2));
  process.exit(0);
}

checkPerson();
