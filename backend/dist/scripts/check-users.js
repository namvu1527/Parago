"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const users = await prisma.user.findMany();
    console.log(users.map(u => ({ id: u.id, name: u.name })));
}
main().finally(() => prisma.$disconnect());
//# sourceMappingURL=check-users.js.map