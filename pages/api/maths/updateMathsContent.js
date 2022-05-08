import { getSession } from 'next-auth/react';
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    const prisma = new PrismaClient();
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "maths")) {
        return res.status(401).send();
    }

    const { id, kefalaio, enothta, taksh, main_content } = req.body;

    if (req.method !== "PUT") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (id === "") {
        return res.status(500).json({ status: "error", data: { error: "Id cannot be null" } });
    }

    const existingContent = await prisma.maths_content.findFirst({
        where: {
            id: id
        }
    });

    if (existingContent === null) {
        return res.status(400).json({ status: "error", data: { error: "Content does not exist" } });
    }

    if (kefalaio === "" && enothta === "" && taksh === "" && main_content === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null " } });
    }

    if (kefalaio === "") {
        kefalaio = existingContent.kefalaio;
    }

    if (enothta === "") {
        enothta = existingContent.enothta;
    }

    if (taksh === "") {
        taksh = existingContent.taksh;
    }

    if (main_content === "") {
        main_content = existingContent.main_content;
    }

    await prisma.maths_content.update({
        where: {
            id: id
        },

        data: {
            kefalaio: kefalaio,
            enothta: enothta,
            taksh: taksh,
            main_content: main_content,
            userid: session.user.id
        }
    });

    return res.status(204).send();
}
