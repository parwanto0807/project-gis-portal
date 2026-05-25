import prisma from './src/config/prisma.js';

async function main() {
    console.log(await prisma.company.findMany());
}

main().finally(() => prisma.$disconnect());
