import cors from "../../../../utils/corsHandler";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    await cors(req, res);
    const prisma = new PrismaClient();

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
                    vommoriza: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vsunonima: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vantonima: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vfoni: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    venor: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    venup: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    veneu: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    venpr: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    venap: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    venme: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparatatikosor: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparatatikosup: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparatatikoseu: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparatatikospr: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparatatikosap: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparatatikosme: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vmeor: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vmeup: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vmeeu: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vmepr: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vmeap: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vmeme: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpmeaor: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpmeaeu: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpmeaap: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpmeame: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpmebor: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpmebeu: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpmebap: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpmebme: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vaoror: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vaorup: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vaoreu: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vaorpr: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vaorap: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vaorme: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vaorbor: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vaorbup: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vaorbeu: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vaorbpr: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vaorbap: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vaorbme: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpaoraor: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpaoraup: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpaoraeu: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpaorapr: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpaoraap: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpaorame: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpaorbor: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpaorbup: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpaorbeu: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpaorbpr: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpaorbap: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vpaorbme: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparakor: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparakup: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparakeu: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparakpr: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparakap: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparakme: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparakbor: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparakbup: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparakbeu: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparakbpr: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparakbap: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vparakbme: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vupor: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vupup: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vupeu: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vuppr: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vupap: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vupme: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vsmeor: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vsmeup: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vsmeeu: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vsmepr: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vsmeap: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    vsmeme: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    ogenos: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    oenikos: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    opluthintikos: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    eklisi: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    eenikosar: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    eenikosth: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    eenikosou: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    eplithintikosar: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    eplithintikosth: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    eplithintikosou: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    ethetikos: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    esugkritikos: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    euperthetikos: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    aeidos: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    aenikosar: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    aenikosth: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    aenikosou: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    aplithintikosar: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    aplithintikosth: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    aplithintikosou: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    aenikosa: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    aenikosb: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    aenikosg: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    aplithintikosa: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    aplithintikosb: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    aplithintikosg: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },

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