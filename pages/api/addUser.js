import prisma from '../../utils/db';
import { getSession } from 'next-auth/react';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || session.user.name !== "admin") {
        return res.status(401).send();
    }

    const { name, email, password, permissions } = req.body;

    if (req.method !== "POST") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (name === "" || email === "" || password === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null" } });
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            name: name
        }
    });

    if (existingUser !== null) {
        return res.status(400).json({ status: "error", data: { error: "User already exists" } });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hash,
            permissions: permissions
        }
    });

    return res.status(201).json({ status: "success", data: { id: newUser.id, createdAt: newUser.createdAt } });
}
