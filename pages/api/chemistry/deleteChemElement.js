import { getSession } from 'next-auth/react';
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    // authenticated route
    const prisma = new PrismaClient();
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "chem")) {
        return res.status(401).send();
    }

    const { id } = req.body;

    if (req.method !== "DELETE") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (id === "") {
        return res.status(500).json({ status: "error", data: { error: "Id cannot be null" } });
    }

    const existingElement = await prisma.chem_element.findFirst({
        where: {
            id: id
        }
    });

    if (existingElement === null) {
        return res.status(400).json({ status: "error", data: { error: "Element does not exist" } });
    }

    await prisma.chem_element.delete({
        where: {
            id: id
        }
    });

    return res.status(200).send();
}
