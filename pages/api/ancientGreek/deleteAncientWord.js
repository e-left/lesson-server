import { getSession } from 'next-auth/react';
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "ancientgreek")) {
        return res.status(401).send();
    }

    const { id } = req.body;

    if (req.method !== "DELETE") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (id === "") {
        return res.status(500).json({ status: "error", data: { error: "Id cannot be null" } });
    }

    const existingWord = await prisma.ancient_words.findFirst({
        where: {
            id: id
        }
    });

    if (existingWord === null) {
        return res.status(400).json({ status: "error", data: { error: "Word does not exist" } });
    }

    await prisma.ancient_words.delete({
        where: {
            id: id
        }
    });

    return res.status(200).send();
}
