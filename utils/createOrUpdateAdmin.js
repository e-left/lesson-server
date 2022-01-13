const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const PASSWORD = "hello";

const main = async () => {
    const hash = await bcrypt.hash(PASSWORD, 10);
    const prisma = new PrismaClient();

    const admin = await prisma.user.findFirst({
        where: {
            name: "admin"
        }
    });

    if (admin !== null) {
        // update
        await prisma.user.update({
            where: {
                id: admin.id
            },
            data: {
                name: "admin",
                email: "admin@admin.com",
                password: hash,
                permissions: "all"
            }
        });
    } else {
        // create
        await prisma.user.create({
            data: {
                name: "admin",
                email: "admin@admin.com",
                password: hash,
                permissions: "all"
            }
        });
    }

    prisma.$disconnect();
}

main();
