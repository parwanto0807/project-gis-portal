
import { prismaHrm } from './src/services/prismaService.js';

async function checkLeftEmployeeActivity() {
  const leftEmployees = await prismaHrm.karyawan.findMany({
    where: { NOT: { TGL_OUT: null } },
    select: { EMPL_ID: true }
  });
  
  const ids = leftEmployees.map(e => e.EMPL_ID);
  
  const recentAttendance = await prismaHrm.absent.count({
    where: {
        AND: [
            { EMPL_ID: { in: ids } },
            { TGL_ABSEN: { gt: new Date('2024-01-01') } }
        ]
    }
  });
  
  console.log(`Employees with TGL_OUT having attendance after 2024: ${recentAttendance}`);
  process.exit(0);
}

checkLeftEmployeeActivity();
