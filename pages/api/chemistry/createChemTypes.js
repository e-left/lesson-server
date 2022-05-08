import { getSession } from 'next-auth/react';
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    const prisma = new PrismaClient();
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "chem")) {
        return res.status(401).send();
    }

    const { taksh, main_content } = req.body;

    if (req.method !== "POST") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (main_content === "" || taksh === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null" } });
    }

    const existingTypes = await prisma.chem_types.findFirst({
        where: {
            main_content: main_content
        }
    });

    if (existingTypes !== null) {
        return res.status(400).json({ status: "error", data: { error: "Appendix already exists" } });
    }

    const newTypes = await prisma.chem_types.create({
        data: {
            taksh: taksh,
            main_content: main_content,
            userid: session.user.id
        }
    });

    return res.status(201).json({ status: "success", data: { id: newTypes.id, createdAt: newTypes.createdAt } });
}
