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

    const types = await prisma.chem_types.findMany({
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

    const theory = await prisma.chem_sos_theory.findMany({
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

    const bookChapters = await prisma.chem_book_chapters.findMany({
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

    const bookChaptersCount = bookChapters.length;

    const curriculum = await prisma.chem_curriculum.findMany({
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

    const bookExercises = await prisma.chem_book_exercises.findMany({
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
                    kefalaio: {
                        contains: query,
                        mode: 'insensitive',
                    }
                },
            ],
        }
    });

    const bookExercisesCount = bookExercises.length;

    const appendix = await prisma.chem_basic_appendix.findMany({
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

    const element = await prisma.chem_element.findMany({
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
                {
                    typos: {
                        contains: query,
                        mode: 'insensitive',
                    }
                },
            ],
        },
    });

    const elementCount = element.length;

    return res.status(200).json({
        status: "success", data: {
            types: {
                data: types, count: typesCount,
            },
            theory: {
                data: theory, count: theoryCount,
            },
            bookChapters: {
                data: bookChapters, count: bookChaptersCount,
            },
            curriculum: {
                data: curriculum, count: curriculumCount,
            },
            bookExercises: {
                data: bookExercises, count: bookExercisesCount,
            },
            appendix: {
                data: appendix, count: appendixCount,
            },
            element: {
                data: element, count: elementCount,
            },
        }
    });

}