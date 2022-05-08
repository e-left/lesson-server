import { getSession } from 'next-auth/react';
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    const prisma = new PrismaClient();
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "maths")) {
        return res.status(401).send();
    }

    const { id } = req.body;

    if (req.method !== "DELETE") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (id === "") {
        return res.status(500).json({ status: "error", data: { error: "Id cannot be null" } });
    }

    const existingAppendix = await prisma.maths_basic_appendix.findFirst({
        where: {
            id: id
        }
    });

    if (existingAppendix === null) {
        return res.status(400).json({ status: "error", data: { error: "Appendix does not exist" } });
    }

    await prisma.maths_basic_appendix.delete({
        where: {
            id: id
        }
    });

    return res.status(200).send();
}
