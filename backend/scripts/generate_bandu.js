import bcrypt from 'bcryptjs';
import { prisma, prismaHrm } from '../src/services/prismaService.js';

async function run() {
  console.log('Generating account for BANDU WARSITO (0032)...');

  const emp = await prismaHrm.karyawan.findFirst({
    where: { NIK: '0032' }
  });

  if (!emp) {
    console.log('Employee not found in HRIS.');
    process.exit(1);
  }

  const nikStr = String(emp.NIK).trim();
  const defaultPassword = '12345';

  const existingUser = await prisma.user.findFirst({
    where: { username: nikStr }
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    await prisma.user.create({
      data: {
        username: nikStr,
        email: `${nikStr}@noemail.local`, // Dummy email since email is unique required
        password: hashedPassword,
        firstName: emp.NAMA,
        mustChangePassword: true,
        role: 'USER'
      }
    });
    console.log(`Successfully created account for ${emp.NAMA} with NIK ${nikStr}`);
  } else {
    console.log(`Account for ${nikStr} already exists!`);
  }

  await prisma.$disconnect();
  await prismaHrm.$disconnect();
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
