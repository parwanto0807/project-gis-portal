import bcrypt from 'bcryptjs';
import { prisma } from '../src/services/prismaService.js';

async function updatePasswords() {
    console.log('Updating all mustChangePassword users to 12345...');
    const hashedPassword = await bcrypt.hash('12345', 10);
    const result = await prisma.user.updateMany({
        where: { mustChangePassword: true },
        data: { password: hashedPassword }
    });
    console.log(`Updated ${result.count} users.`);
    await prisma.$disconnect();
}

updatePasswords();
