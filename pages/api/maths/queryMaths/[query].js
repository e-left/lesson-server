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

    const types = await prisma.maths_types.findMany({
        where: {
            OR: [
                {
                    main_content: {
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
            ],
        },
    });

    const typesCount = types.length;

    const theory = await prisma.maths_sos_theory.findMany({
        where: {
            OR: [
                {
                    main_content: {
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
            ],
        },
    });

    const theoryCount = theory.length;

    const proofs = await prisma.maths_proofs.findMany({
        where: {
            OR: [
                {
                    main_content: {
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
            ],
        },
    });

    const proofsCount = proofs.length;

    const curriculum = await prisma.maths_curriculum.findMany({
        where: {
            OR: [
                {
                    main_content: {
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
            ],
        },
    });

    const curriculumCount = curriculum.length;

    const content = await prisma.maths_content.findMany({
        where: {
            OR: [
                {
                    main_content: {
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
                    enothta: {
                        contains: query,
                        mode: 'insensitive',
                    }
                },
                {
                    kefalaio: {
                        contains: query,
                        mode: 'insensitive',
                    }
                },
            ],
        }
    });

    const contentCount = content.length;

    const appendix = await prisma.maths_basic_appendix.findMany({
        where: {
            OR: [
                {
                    main_content: {
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
                    title: {
                        contains: query,
                        mode: 'insensitive',
                    }
                },
            ],
        },
    });

    const appendixCount = appendix.length;

    return res.status(200).json({
        status: "success", data: {
            types: {
                data: types, count: typesCount,
            },
            theory: {
                data: theory, count: theoryCount,
            },
            proofs: {
                data: proofs, count: proofsCount,
            },
            curriculum: {
                data: curriculum, count: curriculumCount,
            },
            content: {
                data: content, count: contentCount,
            },
            appendix: {
                data: appendix, count: appendixCount,
            },
        }
    });

}