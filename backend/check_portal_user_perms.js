import { prisma } from './src/services/prismaService.js';

async function checkUserWithPermissions() {
  const user = await prisma.user.findFirst({
    where: { email: 'parwanto0807@gmail.com' },
    include: { permissions: true }
  });
  console.log(JSON.stringify(user, null, 2));
  process.exit();
}
checkUserWithPermissions();
