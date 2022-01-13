import prisma from '../../utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || session.user.name !== "admin") {
        return res.status(401).send();
    }

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    let users = await prisma.user.findMany();
    users.forEach(user => {
        delete user.password;
    });

    users = users.filter(user => {
        return user.name !== "admin";
    });

    return res.status(200).json({ status: "success", data: users });
}
