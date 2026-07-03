import { prismaHrm } from '../src/services/prismaService.js';

async function run() {
  const employees = await prismaHrm.karyawan.findMany({
    where: { NAMA: { contains: 'BANDU' } }
  });
  console.log("Found employees matching BANDU:");
  console.table(employees);
  
  await prismaHrm.$disconnect();
}

run();
