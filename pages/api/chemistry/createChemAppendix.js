import { getSession } from 'next-auth/react';
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    // authenticated route
    const prisma = new PrismaClient();
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "chem")) {
        return res.status(401).send();
    }

    const { title, taksh, main_content } = req.body;

    if (req.method !== "POST") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (title === "" || main_content === "" || taksh === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null" } });
    }

    const existingAppendix = await prisma.chem_basic_appendix.findFirst({
        where: {
            main_content: main_content
        }
    });

    if (existingAppendix !== null) {
        return res.status(400).json({ status: "error", data: { error: "Appendix already exists" } });
    }

    const newAppendix = await prisma.chem_basic_appendix.create({
        data: {
            title: title,
            taksh: taksh,
            main_content: main_content,
            userid: session.user.id
        }
    });

    return res.status(201).json({ status: "success", data: { id: newAppendix.id, createdAt: newAppendix.createdAt } });
}
