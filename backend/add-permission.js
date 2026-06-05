import { PrismaClient } from './src/generated/client/index.js';
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.findUnique({ where: { id: 5 } });
    if (!user) {
        console.log("User 5 not found");
        return;
    }

    // HR module covers Temuan
    const existingPerm = await prisma.permission.findFirst({
        where: { userId: 5, module: 'HR' }
    });

    if (existingPerm) {
        const actions = new Set(existingPerm.actions);
        actions.add('READ');
        actions.add('CREATE');
        actions.add('UPDATE');
        
        await prisma.permission.update({
            where: { id: existingPerm.id },
            data: { actions: Array.from(actions) }
        });
        console.log("Updated HR permission for User 5");
    } else {
        await prisma.permission.create({
            data: {
                userId: 5,
                module: 'HR',
                actions: ['READ', 'CREATE', 'UPDATE', 'DELETE']
            }
        });
        console.log("Created HR permission for User 5");
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
