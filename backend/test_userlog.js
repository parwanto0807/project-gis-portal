import prisma from './src/config/prisma.js';

async function main() {
    try {
        if (prisma.userLog) {
            console.log("prisma.userLog is AVAILABLE");
        } else {
            console.log("prisma.userLog is NOT AVAILABLE");
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}
main();
