import { prisma } from './src/services/prismaService.js';

async function checkUser() {
  const user = await prisma.user.findFirst({
    where: { email: 'parwanto0807@gmail.com' }
  });
  console.log(JSON.stringify(user, null, 2));
  process.exit();
}
checkUser();
