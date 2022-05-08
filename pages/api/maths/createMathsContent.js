import { getSession } from 'next-auth/react';
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    const prisma = new PrismaClient();
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "maths")) {
        return res.status(401).send();
    }

    const { kefalaio, enothta, taksh, main_content } = req.body;

    if (req.method !== "POST") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (kefalaio === "" || enothta === "" || taksh === "" || main_content === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null " } });
    }

    const existingContent = await prisma.maths_content.findFirst({
        where: {
            main_content: main_content
        }
    });

    if (existingContent !== null) {
        return res.status(400).json({ status: "error", data: { error: "Content already exists" } });
    }

    const newContent = await prisma.maths_content.create({
        data: {
            kefalaio: kefalaio,
            enothta: enothta,
            taksh: taksh,
            main_content: main_content,
            userid: session.user.id
        }
    });

    return res.status(201).json({ status: "success", data: { id: newContent.id, createdAt: newContent.createdAt } });
}
