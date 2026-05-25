
import { prismaHrm } from './src/services/prismaService.js';

async function checkColumns() {
  try {
    const result = await prismaHrm.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'karyawan';
    `;
    console.log('Columns in karyawan table:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error fetching columns:', error);
  } finally {
    await prismaHrm.$disconnect();
    process.exit(0);
  }
}

checkColumns();
