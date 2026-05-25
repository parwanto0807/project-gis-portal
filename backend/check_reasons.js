
import { prismaHrm } from './src/services/prismaService.js';

async function checkReasons() {
  const reasons = await prismaHrm.karyawan.groupBy({
    by: ['ALASAN_OUT'],
    _count: { _all: true }
  });
  console.log('REASONS:', JSON.stringify(reasons, null, 2));
  process.exit(0);
}

checkReasons();
