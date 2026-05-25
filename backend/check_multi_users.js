
import { prisma } from './src/services/prismaService.js';

async function checkMultipleUsers() {
  const email = 'parwanto0807@gmail.com';
  
  const users = await prisma.user.findMany({
    where: { email }
  });

  console.log('--- USERS IN PORTAL DB ---');
  console.log(JSON.stringify(users, null, 2));
  
  process.exit(0);
}

checkMultipleUsers();
