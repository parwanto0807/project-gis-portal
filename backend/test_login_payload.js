
import { prisma } from './src/services/prismaService.js';

async function testGoogleLoginCall() {
  const email = 'parwanto0807@gmail.com';
  const userFromDb = await prisma.user.findUnique({
    where: { email },
  });

  if (!userFromDb) {
    console.log("No user in DB");
    return;
  }

  const { generateTokens } = await import('./src/utils/jwt.js');
  const tokens = generateTokens(userFromDb, null);

  console.log('--- PAYLOAD userFromDb ---');
  console.log(userFromDb.role);
  console.log('--- TOKENS ---');
  console.log(tokens);

  process.exit(0);
}

testGoogleLoginCall();
