import prisma from '../../utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || session.user.name !== "admin") {
        return res.status(401).send();
    }

    const { name } = req.body;

    if (req.method !== "DELETE") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (name === "") {
        return res.status(500).json({ status: "error", data: { error: "Name cannot be null" } });
    }

    if (name === "admin") {
        return res.status(500).json({ status: "error", data: { error: "Cannot delete admin user" } });
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            name: name
        }
    });

    if (existingUser === null) {
        return res.status(400).json({ status: "error", data: { error: "User does not exist" } });
    }

    const newUser = await prisma.user.delete({
        where: {
            id: existingUser.id
        }
    });

    return res.status(204).send();
}
