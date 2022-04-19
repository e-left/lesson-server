import prisma from '../../../utils/db';
import cors from "../../../utils/corsHandler";

export default async function handler(req, res) {
    await cors(req, res);

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    const { id } = req.query;

    // get user statistics, for everything

    // ancient words
    const words = await prisma.ancient_words.findMany({
        where: {
            userid: parseInt(id)
        }
    });

    const wordCount = words.length;

    // ancient translations
    const translations = await prisma.ancient_translations.findMany({
        where: {
            userid: parseInt(id)
        }
    });

    const translationCount = translations.length;

    return res.status(200).json({
        status: "success",
        wordCount: wordCount,
        translationCount: translationCount
    });
}
