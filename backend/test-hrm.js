import { prismaHrm } from './src/services/prismaService.js';

async function main() {
    console.log(await prismaHrm.company.findMany());
}

main().catch(console.error);
