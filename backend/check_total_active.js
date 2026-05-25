
import { prismaHrm } from './src/services/prismaService.js';

async function checkTotalRecentActivity() {
  const recentAttendanceCount = await prismaHrm.absent.groupBy({
    by: ['EMPL_ID'],
    where: { TGL_ABSEN: { gt: new Date('2024-01-01') } }
  });
  
  console.log(`Unique employees with attendance after 2024: ${recentAttendanceCount.length}`);
  process.exit(0);
}

checkTotalRecentActivity();
