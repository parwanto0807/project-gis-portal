import bcrypt from 'bcryptjs';
import { prisma, prismaHrm } from '../src/services/prismaService.js';

async function run() {
  console.log('Starting employee generation script...');

  const activeCondition = {
    AND: [
      { KD_STS: 'AKTIF' },
      { KD_OUT: true }
    ]
  };

  try {
    const employees = await prismaHrm.karyawan.findMany({
      where: activeCondition,
      select: {
        NIK: true,
        NAMA: true
      }
    });

    console.log(`Found ${employees.length} active employees in HRM system.`);

    let createdCount = 0;
    let skippedCount = 0;

    for (const emp of employees) {
      if (!emp.NIK || !emp.NAMA) {
        skippedCount++;
        continue;
      }

      // Convert NIK to string
      const nikStr = String(emp.NIK).trim();
      
      // Set default password to 12345
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
        createdCount++;
        if (createdCount % 50 === 0) {
            console.log(`Created ${createdCount} users...`);
        }
      } else {
        skippedCount++;
      }
    }

    console.log('\n--- Sync Complete ---');
    console.log(`Created Accounts: ${createdCount}`);
    console.log(`Skipped (Already Exists or Invalid): ${skippedCount}`);
    
  } catch (error) {
    console.error('Error syncing employees:', error);
  } finally {
    await prisma.$disconnect();
    await prismaHrm.$disconnect();
  }
}

run();
