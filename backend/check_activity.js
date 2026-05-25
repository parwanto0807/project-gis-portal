
import { prismaHrm } from './src/services/prismaService.js';

async function checkRecentActivity() {
  try {
    const recentAbsence = await prismaHrm.absent.findMany({
        orderBy: { TGL_ABSEN: 'desc' },
        take: 10,
        select: { TGL_ABSEN: true, EMPL_ID: true }
    });
    
    console.log('Recent Absence records:');
    console.log(JSON.stringify(recentAbsence, null, 2));

  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

checkRecentActivity();
