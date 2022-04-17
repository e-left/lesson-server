import prisma from '../../../../utils/db';
import cors from "../../../../utils/corsHandler";

export default async function handler(req, res) {
    await cors(req, res);

    const { query } = req.query;

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (query === "") {
        return res.status(400).json({ status: "error", data: { error: "No search string supplied" } });
    }

    const words = await prisma.ancient_words.findMany({
        orderBy: [
            {
                title: "asc",
            },
        ],
        where: {
            OR: [
                {
                    title: {
                        contains: query,
                        mode: 'insensitive',
                    }
                },
                {
                    
                }
            ],
        }
    });

    const translations = await prisma.ancient_translations.findMany({
        orderBy: [
            {
                chapter: "asc",
            },
        ],
        where: {
            OR: [
                {
                    title: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
                {
                    chapter: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
                {
                    taksh: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
                {
                    original_text: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
                {
                    translated_text: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
                {
                    syntactic_analysis: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
            ]
        }
    });

    const wordCount = words.length;
    const translationsCount = translations.length;

    return res.status(200).json({
        status: "success", data: {
            words: {
                data: words,
                count: wordCount,
            },
            translations: {
                data: translations,
                count: translationsCount,
            }
        }
    });

}