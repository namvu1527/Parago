"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function run() {
    await prisma.notification.deleteMany();
    console.log('Cleared Notification table');
}
run().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=clearDb.js.map