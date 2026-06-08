import { PrismaClient } from './src/generated/client/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  await prisma.user.updateMany({
    data: {
      password: hashedPassword
    }
  });

  console.log("Semua password user berhasil direset menjadi 'password123'");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
