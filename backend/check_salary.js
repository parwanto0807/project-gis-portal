
import { prismaHrm } from './src/services/prismaService.js';

async function checkSalaryActivity() {
  const recentGaji = await prismaHrm.gaji.findMany({
    orderBy: { PERIOD: 'desc' },
    take: 1,
    select: { PERIOD: true }
  });
  
  if (recentGaji.length === 0) {
    console.log('No gaji records');
    process.exit(0);
  }
  
  const period = recentGaji[0].PERIOD;
  const count = await prismaHrm.gaji.count({ where: { PERIOD: period } });
  
  console.log(`Latest Salary Period: ${period}`);
  console.log(`Employees with salary in that period: ${count}`);
  
  process.exit(0);
}

checkSalaryActivity();
