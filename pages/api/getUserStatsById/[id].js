import cors from "../../../utils/corsHandler";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    await cors(req, res);
    const prisma = new PrismaClient();

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

    // maths types
    const mathsTypes = await prisma.maths_types.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const mathsTypesCount = mathsTypes.length;

    // maths theory
    const mathsTheory = await prisma.maths_sos_theory.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const mathsTheoryCount = mathsTheory.length;

    // maths proofs
    const mathsProofs = await prisma.maths_proofs.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const mathsProofsCount = mathsProofs.length;

    // maths curriculum
    const mathsCurriculum = await prisma.maths_curriculum.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const mathsCurriculumCount = mathsCurriculum.length;

    // maths main content
    const mathsContent = await prisma.maths_content.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const mathsContentCount = mathsContent.length;

    // maths appendix
    const mathsAppendix = await prisma.maths_basic_appendix.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const mathsAppendixCount = mathsAppendix.length;

    // chemistry types
    const chemTypes = await prisma.chem_types.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const chemTypesCount = chemTypes.length;

    // chemistry theory
    const chemTheory = await prisma.chem_sos_theory.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const chemTheoryCount = chemTheory.length;

    // chemistry book chapters
    const chemBookChapters = await prisma.chem_book_chapters.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const chemBookChaptersCount = chemBookChapters.length;

    // chemistry curriculum
    const chemCurriculum = await prisma.chem_curriculum.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const chemCurriculumCount = chemCurriculum.length;

    // chemistry book exercises
    const chemBookExercises = await prisma.chem_book_exercises.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const chemBookExercisesCount = chemBookExercises.length;

    // chemistry appendix
    const chemAppendix = await prisma.chem_basic_appendix.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const chemAppendixCount = chemAppendix.length;

    // chemistry element
    const chemElement = await prisma.chem_element.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const chemElementCount = chemElement.length;

    // return data
    return res.status(200).json({
        status: "success",
        wordCount: wordCount,
        translationCount: translationCount,
        mathsTypesCount: mathsTypesCount,
        mathsTheoryCount: mathsTheoryCount,
        mathsProofsCount: mathsProofsCount,
        mathsCurriculumCount: mathsCurriculumCount,
        mathsContentCount: mathsContentCount,
        mathsAppendixCount: mathsAppendixCount,
        chemTypesCount: chemTypesCount,
        chemTheoryCount: chemTheoryCount,
        chemBookChaptersCount: chemBookChaptersCount,
        chemCurriculumCount: chemCurriculumCount,
        chemBookExercisesCount: chemBookExercisesCount,
        chemAppendixCount: chemAppendixCount,
        chemElementCount: chemElementCount,
    });
}
