import prisma from '../../../utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "ancientgreek")) {
        return res.status(401).send();
    }

    const { id, taksh, title, chapter, original_text, translated_text, syntactic_analysis } = req.body;

    if (req.method !== "PUT") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (id === "") {
        return res.status(500).json({ status: "error", data: { error: "Id cannot be null" } });
    }

    const existingTranslation = await prisma.ancient_translations.findFirst({
        where: {
            id: id
        }
    });

    if (existingTranslation === null) {
        return res.status(400).json({ status: "error", data: { error: "Translation does not exist" } });
    }

    if (taksh === "" && title === "" && chapter === "" && original_text === "" && translated_text === "" && syntactic_analysis === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null " } });
    }

    if (title === "") {
        title = existingTranslation.title;
    }

    if (chapter === "") {
        chapter = existingTranslation.chapter;
    }

    if (taksh === "") {
        taksh = existingTranslation.taksh;
    }

    if (original_text === "") {
        original_text = existingWord.original_text;
    }

    if (translated_text === "") {
        translated_text = existingWord.translated_text;
    }

    if (syntactic_analysis === "") {
        syntactic_analysis = existingWord.syntactic_analysis;
    }

    await prisma.ancient_translations.update({
        where: {
            id: id
        },

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

    return res.status(204).send();
}
