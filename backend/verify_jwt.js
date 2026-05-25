
import { prisma } from './src/services/prismaService.js';
import jwt from 'jsonwebtoken';

async function verifyTokenFormat() {
  const email = 'parwanto0807@gmail.com';
  const userFromDb = await prisma.user.findUnique({
    where: { email },
  });

  const { generateTokens } = await import('./src/utils/jwt.js');
  const tokens = generateTokens(userFromDb, null);

  const decoded = jwt.decode(tokens.accessToken);
  console.log('--- DECODED ACCESS TOKEN ---');
  console.log(JSON.stringify(decoded, null, 2));

  process.exit(0);
}

verifyTokenFormat();
