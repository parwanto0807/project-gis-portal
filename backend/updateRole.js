import prisma from './src/config/prisma.js';

async function main() {
  try {
    const user = await prisma.user.update({
      where: { email: 'parwanto0807@gmail.com' },
      data: { role: 'SUPER_ADMIN' }
    });
    console.log('Success! Updated user:', user.email, 'to role:', user.role);
  } catch (err) {
    console.error('Error updating user:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
