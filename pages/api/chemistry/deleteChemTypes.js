import { getSession } from 'next-auth/react';
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    const prisma = new PrismaClient();
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

    const existingTypes = await prisma.chem_types.findFirst({
        where: {
            id: id
        }
    });

    if (existingTypes === null) {
        return res.status(400).json({ status: "error", data: { error: "Type does not exist" } });
    }

    await prisma.chem_types.delete({
        where: {
            id: id
        }
    });

    return res.status(200).send();
}
