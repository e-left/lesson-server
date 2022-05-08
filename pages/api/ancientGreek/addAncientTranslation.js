import { getSession } from 'next-auth/react';
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "ancientgreek")) {
        return res.status(401).send();
    }

    const { taksh, title, chapter, original_text, translated_text, syntactic_analysis } = req.body;

    if (req.method !== "POST") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (taksh === "" | title === "" || chapter === "" || original_text === "" || translated_text === "" || syntactic_analysis === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null " } });
    }

    const existingTranslation = await prisma.ancient_translations.findFirst({
        where: {
            title: title
        }
    });

    if (existingTranslation !== null) {
        return res.status(400).json({ status: "error", data: { error: "Translation already exists" } });
    }

    const newTranslation = await prisma.ancient_translations.create({
        data: {
            title: title,
            taksh: taksh,
            chapter: chapter,
            original_text: original_text,
            translated_text: translated_text,
            syntactic_analysis: syntactic_analysis,
            userid: session.user.id
        }
    });

    return res.status(201).json({ status: "success", data: { id: newTranslation.id, createdAt: newTranslation.createdAt } });
}
