
import { prisma } from './src/services/prismaService.js';

async function checkVendor() {
  const vendors = await prisma.user.findMany({ 
    where: { role: 'VENDOR' }, 
    include: { companies: { include: { company: true } } }
  });
  console.log(JSON.stringify(vendors, null, 2));
  process.exit();
}
checkVendor();
